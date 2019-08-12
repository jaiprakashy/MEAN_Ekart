import { AddressService } from './../../shared/address.service';
import { Address } from './../../shared/address.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent implements OnInit {

  newAddress = new Address();
  allAddresses: Address[];
  expandedIndex: number
  severErrorMessages: string;
  serverSuccessMessages: string;

  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.getAllAddresses();
  }

  getAllAddresses() {
    this.addressService.getAddress().subscribe(
      res => {
        console.log(res);
        this.allAddresses = res['addresses'];
      },
      err => {
        this.severErrorMessages = err.error.message;
        setTimeout(() => {
          this.severErrorMessages = ""
        }, 3000);
      }
    )
  }

  saveAddress(formData) {
    console.log(formData);
    this.expandedIndex = -2;
    if (formData) {
      if (formData._id) {

      } else {
        this.addressService.postAddress(formData).subscribe(
          res => {
            if (res['address']) {
              this.allAddresses.push(res['address']);
            }
            console.log(this.allAddresses);
          },
          err => {
            this.severErrorMessages = err.error.message;
            setTimeout(() => {
              this.severErrorMessages = ""
            }, 3000);
          }
        )
      }
    }
  }

}
