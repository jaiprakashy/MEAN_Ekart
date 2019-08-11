import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }
  searchForm: FormGroup =  new FormGroup({
    searchText: new FormControl
 });

  loadLoginPage() {
    const modalRef = this.modalService.open(LoginComponent, {windowClass: "myCustomModalClass"})
  }

  search() {}

  logout() {
    this.userService.deleteToken();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.userService.getUserProfile().subscribe(
        res => {
          console.log(res['user']);
          
          this.userService.loggedInUsername = res['user'].name;
        },
        err => {}
      )
    }
    console.log("On init");
  }

}
