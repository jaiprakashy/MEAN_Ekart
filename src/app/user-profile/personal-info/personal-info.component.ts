import { UserService } from './../../shared/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { format } from 'util';

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
  get nuf() {return this.nameUpdateForm.controls};
  get euf() {return this.emailUpdateForm.controls};
  get muf() {return this.mobileNumberUpdateForm.controls};

  emailUpdateForm: FormGroup = new FormGroup({
    email: new FormControl(this.userDetails.email, [Validators.required])
  })
  mobileNumberUpdateForm: FormGroup = new FormGroup({
    mobile: new FormControl(this.userDetails.mobile, [Validators.required])
  })

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserDetails()
    this.nameUpdateForm.disable();
    this.emailUpdateForm.disable();
    this.mobileNumberUpdateForm.disable();
  }

  getUserDetails() {
    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res['user']);
        this.userDetails.name = res['user'].name;
        this.userDetails.email = res['user'].email;

        this.nameUpdateForm.controls['name'].setValue(this.userDetails.name);
        // this.nameUpdateForm.controls['email'].setValue(this.userDetails.email);
        console.log(this.userDetails);
      },
      err => {}
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

  nameFormSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    if (this.nameUpdateForm.controls['name'].value == this.userDetails.name) {
      this.toggleNameFormStatus(form);
      return
    }
    console.log("Submit")
  }
}
