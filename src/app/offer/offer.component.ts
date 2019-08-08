import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  
  @Input() offer: {name: string; image: string; discount: string; price: string}

  constructor() { }

  ngOnInit() {
  }

}
