import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Card } from './card.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  postCard(card: Card) {
    return this.http.post(environment.apiBaseUrl+'/card', card);
  }

  getCards() {
    console.log("get card service");
    
    return this.http.get(environment.apiBaseUrl+'/card');
  }

  deleteCard(cardId: string) {
    return this.http.delete(environment.apiBaseUrl+'/card'+`/${cardId}`);
  }
}
