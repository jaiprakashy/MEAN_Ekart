import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pageTitle: string = "Login";
  pageDescription: string = "Get access to your Oredrs, Wishlist and Recommendations";
  toggleLinkTitle: string = "New to Meankart? Create an account"

  showLoginForm() {
    this.pageTitle = "Login";
    this.pageDescription = "Get access to your Oredrs, Wishlist and Recommendations";
  }

  showSignupForm() {
    this.pageTitle = "Sign Up";
    this.pageDescription = "We do not share your personal data with anyone";
  }

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
