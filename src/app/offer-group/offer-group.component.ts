import {
  Component,
  OnInit,
  Input
} from '@angular/core';

interface Offer {
  name: string;
  image: string;
  discount: string;
  price: string;
}

@Component({
  selector: 'app-offer-group',
  templateUrl: './offer-group.component.html',
  styleUrls: ['./offer-group.component.css']
})
export class OfferGroupComponent implements OnInit {

  @Input() primaryTitle: string;
  @Input() secondaryTitle: string;

  offersList: Offer[][] = [
    [{
        name: "Apple iPad",
        image: "ipad",
        discount: "2,000",
        price: "29,999"
      },
      {
        name: "Sony Headphones",
        image: "headphone",
        discount: "300",
        price: "599"
      },
      {
        name: "Macbook Air",
        image: "macbook-air",
        discount: "5,000",
        price: "47,999"
      },
      {
        name: "Nikon DSLR",
        image: "nikon",
        discount: "7,000",
        price: "41,999"
      }
    ],
    [{
        name: "Sony PlayStation",
        image: "play-station",
        discount: "2,000",
        price: "29,999"
      },
      {
        name: "Macbook Pro",
        image: "macbook-pro",
        discount: "4,000",
        price: "72,999"
      },
      {
        name: "Bose Speaker",
        image: "speaker",
        discount: "3,000",
        price: "22,999"
      },
      {
        name: "Samsung Galaxy S8",
        image: "galaxy",
        discount: "2,000",
        price: "28,999"
      }
    ],
    [{
        name: "Apple iPhone",
        image: "iphone",
        discount: "4,000",
        price: "23,999"
      },
      {
        name: "Canon DSLR",
        image: "canon",
        discount: "1,000",
        price: "39,999"
      },
      {
        name: "Google Pixel",
        image: "pixel",
        discount: "6,000",
        price: "56,999"
      },
      {
        name: "Apple Watch",
        image: "watch",
        discount: "3,000",
        price: "26,999"
      }
    ]
  ]

  getOfferList(): Offer[][] {
    this.offersList.sort(() => Math.random() - 0.5);
    return this.offersList;
  }

  constructor() {}

  ngOnInit() {}

}
