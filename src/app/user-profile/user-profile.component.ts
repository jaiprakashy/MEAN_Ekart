import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails = {name: "", email: ""};

  constructor(private userService: UserService, private router: Router) { }

  logout() {
    this.userService.deleteToken();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res['user']);
        
        this.userDetails = res['user'];
      },
      err => {}
    )
  }

}
