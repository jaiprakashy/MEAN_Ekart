import { Address } from './../../shared/address.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent implements OnInit {

  newAddress = new Address();
  expandedIndex: number

  constructor() { }

  ngOnInit() {
  }

  saveAddress(formData) {
    console.log(formData);
    this.expandedIndex = -2;
    if (formData) {
      console.log(formData);
    }
  }

}
