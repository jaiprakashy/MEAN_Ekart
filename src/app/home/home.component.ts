import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  offerTitles: any[] = [{
    primaryTitle: "Deals",
    secondaryTitle: "Of The Day"
  },
  {
    primaryTitle: "Trending",
    secondaryTitle: "Offers"
  },
  {
    primaryTitle: "Recommended",
    secondaryTitle: "For You"
  }]

  constructor() { }

  ngOnInit() {
  }

}
