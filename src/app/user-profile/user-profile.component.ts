import { ProfileMenuOption } from './../shared/helper.enum';
import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails = {name: "", email: ""};
  selectedOption = ProfileMenuOption.profileInformation;
  menuHeaders: ProfileMenuOption[] = [ProfileMenuOption.accountSettings, ProfileMenuOption.payments,
  ProfileMenuOption.myStuff]
  menuOptions = {
    "ACCOUNT SETTINGS": [ProfileMenuOption.profileInformation, ProfileMenuOption.manageAddresses, 
      ProfileMenuOption.panCardInfo,ProfileMenuOption.logout],
      "PAYMENTS": [ProfileMenuOption.phonePeWallet, ProfileMenuOption.giftCards, 
        ProfileMenuOption.payLater, ProfileMenuOption.savedCards],
      "MY STUFF": [ProfileMenuOption.myOrders, ProfileMenuOption.myRewards, 
        ProfileMenuOption.myReviews, ProfileMenuOption.allNotifications, 
        ProfileMenuOption.myWishlist]
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res['user']);
        this.userService.loggedInUsername = res['user'].name;
        this.userDetails = res['user'];
      },
      err => {}
    )
  }

  logout() {
    this.userService.deleteToken();
    this.router.navigate(['/']);
  }

  handleOptionClick(value) {
    this.selectedOption = value;

    if (this.selectedOption === ProfileMenuOption.logout) {
      this.logout();
    }
  }
}
