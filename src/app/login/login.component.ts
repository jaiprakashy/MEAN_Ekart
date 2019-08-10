import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {CustomValidators} from './helpers/custom.validators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pageTitle: string = "Login";
  pageDescription: string = "Get access to your Orders, Wishlist and Recommendations";
  toggleLinkTitle: string = "New to Meankart? Create an account"
  registerForm: FormGroup;
  loginForm: FormGroup;
  submitted = false;

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
    console.log(this.registerForm);
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
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

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: [null, [Validators.required, CustomValidators.patternValidator(/^([^0-9]*)$/, { hasNoNumber: true }),
            CustomValidators.patternValidator(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/,
              { 
                hasNoSpecialCharacters: true
              }
            )]],
          email: [null, [Validators.required, Validators.email]],
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