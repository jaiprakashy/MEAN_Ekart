import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {CustomValidators} from './helpers/custom.validators'
import { User } from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  pageTitle: string = "Login";
  pageDescription: string = "Get access to your Orders, Wishlist and Recommendations";
  toggleLinkTitle: string = "New to Meankart? Create an account"
  registerForm: FormGroup;
  loginForm: FormGroup;
  submitted = false;
  serverErrorMessages: string = "";

  showLoginForm() {
    this.pageTitle = "Login";
    this.pageDescription = "Get access to your Orders, Wishlist and Recommendations";
  }

  showSignupForm() {
    this.pageTitle = "Sign Up";
    this.pageDescription = "We do not share your personal data with anyone";
  }

  get rf() {return this.registerForm.controls;}
  get lf() {return this.loginForm.controls;}

  registerSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let newUser: User = {
      name: this.rf.name.value,
      email: this.rf.email.value,
      password: this.rf.password.value
    }
    this.userService.postUser(newUser).subscribe(
      res => {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
        this.resetRegisterSubmit()
      },
      err => {
        if (err.status === 422 ) {
          this.serverErrorMessages = err.error.join('</br>');
        } else {
          this.serverErrorMessages = "Something went wrong. Please contact admin."
        }
      }
    )
  }

  resetRegisterSubmit() {
    this.registerForm.reset();
    this.submitted = false;
    this.serverErrorMessages = "";
  }

  loginSubmit() {
    console.log(this.loginForm);
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: [null, [Validators.required, CustomValidators.patternValidator(/^([^0-9]*)$/, { hasNoNumber: true }),
            CustomValidators.patternValidator(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/,
              { 
                hasNoSpecialCharacters: true
              }
            )]],
          email: [null, [Validators.required, CustomValidators.patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, {validEmail: true})]],
          password: [null, [Validators.required, Validators.minLength(6), 
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, { hasUpperCase: true }),
            CustomValidators.patternValidator(/[a-z]/, { hasLowerCase: true }),
            CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              { 
                hasSpecialCharacters: true
              }
            )
          ]],
          confirmPassword: [null, Validators.required]
        }, {
          validator: CustomValidators.passwordMatchValidator
        });

      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });
    }
}