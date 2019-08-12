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
  serverErrorMessages: string;
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
        this.serverErrorHandler(err)
      }
    )
  }

  saveAddress(formData) {
    console.log(formData);
    this.expandedIndex = -2;
    if (formData) {
      if (formData._id) {
        this.updateAddress(formData);
      } else {
        this.postAddress(formData);
      }
    }
  }

  postAddress(formData) {
    this.addressService.postAddress(formData).subscribe(
      res => {
        if (res['address']) {
          this.allAddresses.push(res['address']);
        }
        console.log("Update")
        this.serverSuccessHandler(res['message'])
      },
      err => {
        this.serverErrorHandler(err)
      }
    )
  }

  updateAddress(formData) {
    this.addressService.patchAddress(formData).subscribe(
      res => {
        let updatedAddress = res['address'];
        for(var i=0; i<this.allAddresses.length; i++) {
          if (updatedAddress._id === this.allAddresses[i]._id) {
            this.allAddresses[i] = updatedAddress
            break
          }
        }
        this.serverSuccessHandler(res['message'])
      },
      err => {
        this.serverErrorHandler(err)
      }
    )
  }

  deleteAddress(id: string) {
    if (confirm('Are you sure you want to delete this address')) {
      this.addressService.deleteAddress(id).subscribe(
        res => { 
          this.allAddresses = this.allAddresses.filter((address) => {return address._id != id}) 
          this.serverSuccessHandler(res['message'])
        },
        err => { 
          this.serverErrorHandler(err)
         }
      )
    }
  }

  serverErrorHandler(err) {
    this.serverErrorMessages = err.error.message;
    setTimeout(() => {
      this.serverErrorMessages = ""
    }, 3000);
  }

  serverSuccessHandler(message) {
    console.log(message);
    
    this.serverSuccessMessages = message;
    setTimeout(() => {
      this.serverSuccessMessages = ""
    }, 3000);
  }
}
