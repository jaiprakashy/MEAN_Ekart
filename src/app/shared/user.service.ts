import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 

import { User } from './user.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUsername: String = "";

  noAuthHeader = { headers: new HttpHeaders({'noauth': 'true'})};

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl+'/register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl+'/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    console.log("User Profile");
    
    return this.http.get(environment.apiBaseUrl+'/userprofile');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    }
    return null
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }
    return false;
  }

}
