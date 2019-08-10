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

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }
  searchForm: FormGroup =  new FormGroup({
    searchText: new FormControl
 });

  loadLoginPage() {
    const modalRef = this.modalService.open(LoginComponent, {windowClass: "myCustomModalClass"})
  }

  search() {}

  ngOnInit() {
  }

}
