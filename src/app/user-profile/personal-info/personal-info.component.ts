import { UserService } from './../../shared/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  userDetails: {name: String; email: String, mobile: String} = {name: "", email: "", mobile: "9876543210"};
  nameUpdateForm: FormGroup = new FormGroup({
    name: new FormControl(this.userDetails.name, [Validators.required])
  })
  emailUpdateForm: FormGroup = new FormGroup({
    email: new FormControl(this.userDetails.email, [Validators.required, Validators.email])
  })
  // passwordUpdateForm: FormGroup = new FormGroup({
  //   oldPassword: new FormControl(null, [Validators.required]),
  //   newPassword: new FormControl(null, [Validators.required])
  // })

  serverErrorMessages = "";
  serverSuccessMessage = ""

  get nuf() {return this.nameUpdateForm.controls};
  get euf() {return this.emailUpdateForm.controls};
  // get puf() {return this.passwordUpdateForm.controls};

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserDetails()
    this.nameUpdateForm.disable();
    this.emailUpdateForm.disable();
    // this.passwordUpdateForm.disable();
  }

  getUserDetails() {
    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res['user']);
        this.userService.loggedInUsername = res['user'].name;
        
        this.userDetails.name = res['user'].name;
        this.userDetails.email = res['user'].email;

        this.nameUpdateForm.controls['name'].setValue(this.userDetails.name);
        this.emailUpdateForm.controls['email'].setValue(this.userDetails.email);
      },
      err => {
        this.serverErrorMessages = err.error.message;
        setTimeout(()=>{this.serverSuccessMessage = ""}, 3000)
      }
    )
  }

  toggleNameFormStatus(form: FormGroup) {
    if (form.enabled) {
      form.disable();
      this.nameUpdateForm.controls['name'].setValue(this.userDetails.name);
    } else {
      form.enable()
    }
  }

  toggleEmailFormStatus(form: FormGroup) {
    if (form.enabled) {
      form.disable();
      this.emailUpdateForm.controls['email'].setValue(this.userDetails.email);
    } else {
      form.enable()
    }
  }

  // togglePasswordFormStatus(form: FormGroup) {
  //   if (form.enabled) {
  //     form.reset();
  //     form.disable();
  //   } else {
  //     form.enable()
  //   }
  // }

  nameFormSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    if (this.nameUpdateForm.controls['name'].value == this.userDetails.name) {
      this.toggleNameFormStatus(form);
      return
    }
    this.submitForm(form);
  }

  emailFormSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    if (this.emailUpdateForm.controls['email'].value === this.userDetails.email) {
      this.toggleEmailFormStatus(form);
      return;
    }
    this.submitForm(form);
  }

  // passwordFormSubmit(form: FormGroup) {
  //   if (form.valid) {
  //     this.submitForm(form);
  //   } else {
  //     this.serverErrorMessages = "All fields are required."
  //     setTimeout(()=>{this.serverErrorMessages = ""}, 3000)
  //   }
  // }

  submitForm(form: FormGroup) {
    console.log("Submit")
    this.userService.updateUserInfo(form.value).subscribe(
      res => {
        console.log("Hello");
        this.serverSuccessMessage = "Update Successful"
        setTimeout(()=>{this.serverSuccessMessage = ""}, 3000)
        this.getUserDetails()
        form.disable();
      },
      err => {
        if (err.status === 422 ) {
          this.serverErrorMessages = err.error.message;
        } else {
          this.serverErrorMessages = "Something went wrong. Please contact admin."
        }
        setTimeout(()=>{this.serverErrorMessages = ""}, 3000)
      }
    )
  }
}
