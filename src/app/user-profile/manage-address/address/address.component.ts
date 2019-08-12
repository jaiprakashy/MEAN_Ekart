import { Address } from './../../../shared/address.model';
import { CustomValidators } from './../../../login/helpers/custom.validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input() address: Address;
  @Input() collapseKey: string;
  @Output() collapse = new EventEmitter();

  addressForm: FormGroup = new FormGroup({
    _id: new FormControl(null),
    name: new FormControl(null, [Validators.required, CustomValidators.patternValidator(/^([^0-9]*)$/, { hasNoNumber: true }),
    CustomValidators.patternValidator(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/,
      { 
        hasNoSpecialCharacters: true
      }
    )]),
    mobile: new FormControl(null, [Validators.required, CustomValidators.patternValidator(/^\d{10}$/, {hasOnlyDigits: true})]),
    pincode: new FormControl(null, [Validators.required, CustomValidators.patternValidator(/^\d{6}$/, {hasOnlyDigits: true})]),
    locality: new FormControl(null, [Validators.required]),
    area: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required, CustomValidators.patternValidator(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/,
    { 
      hasNoSpecialCharacters: true
    }
  )]),
    state: new FormControl(null, [Validators.required]),
    landmark: new FormControl(null),
    alternateMobile: new FormControl(null, [CustomValidators.patternValidator(/^\d{10}$/, {hasOnlyDigits: true})]) 
  })
  states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"];
  isSubmitted = false
  dataTargetKey: string

  get af() {return this.addressForm.controls}

  constructor() { }

  ngOnInit() {
    this.addressForm.controls['_id'].setValue(this.address._id);
    this.addressForm.controls['name'].setValue(this.address.name);
    this.addressForm.controls['mobile'].setValue(this.address.mobile);
    this.addressForm.controls['pincode'].setValue(this.address.pincode);
    this.addressForm.controls['locality'].setValue(this.address.locality);
    this.addressForm.controls['area'].setValue(this.address.area);
    this.addressForm.controls['city'].setValue(this.address.city);
    this.addressForm.controls['state'].setValue(this.address.state);
    this.addressForm.controls['landmark'].setValue(this.address.landmark);
    this.addressForm.controls['alternateMobile'].setValue(this.address.alternateMobile);
  }

  cancelForm(form: FormGroup) {
    console.log("cancel");
    
    this.collapse.emit();
    this.closeForm(form);
  }

  submitForm(form: FormGroup) {
    this.isSubmitted = true
    
    console.log("submit", form.valid);
    if (form.valid) {
      console.log("Submitting");
      
      this.collapse.emit(form.value);
      this.closeForm(form);
    } else {
      this.dataTargetKey = undefined;
    }
  }

  closeForm(form: FormGroup) {
    console.log("close");
    this.resetForm(form);
    this.collapseForm();
  }

  resetForm(form: FormGroup) {
    form.reset();
    this.isSubmitted = false;
  }

  collapseForm() {
    this.dataTargetKey = this.collapseKey
  }

}
