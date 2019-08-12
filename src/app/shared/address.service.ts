import { Address } from './address.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  postAddress(address: Address) {
    return this.http.post(environment.apiBaseUrl+'/address', address);
  }

  getAddress() {
    return this.http.get(environment.apiBaseUrl+'/address');
  }

  patchAddress(address: Address) {
    return this.http.patch(environment.apiBaseUrl+'/address', address);
  }

  deleteAddress(addressId) {
    return this.http.delete(environment.apiBaseUrl+'/address'+`/${addressId}`);
  }
}
