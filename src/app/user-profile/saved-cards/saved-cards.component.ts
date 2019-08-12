import { Card } from './../../shared/card.model';
import { CardService } from './../../shared/card.service';
import { CustomValidators } from './../../login/helpers/custom.validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-cards',
  templateUrl: './saved-cards.component.html',
  styleUrls: ['./saved-cards.component.css']
})
export class SavedCardsComponent implements OnInit {
  

  cardForm: FormGroup = new FormGroup({
    cardNumber: new FormControl(null, [Validators.required, CustomValidators.patternValidator(/^\d{16}$/, {hasOnlyNumber: true})]),
    expiryMonth: new FormControl(null, [Validators.required]),
    expiryYear: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required, CustomValidators.patternValidator(/^([^0-9]*)$/, { hasNoNumber: true }),
    CustomValidators.patternValidator(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/, { hasNoSpecialCharacters: true })]),
    alias: new FormControl(null, [Validators.required])
  })
  errorMessage: string
  successMessage: string
  isFormActive = false
  isSubmitted = false
  collapseKey = "#collapseExample"
  cards: Card[] = []

  getMonths() {
    let months: number[] = [];
    for(var index = 1; index < 13; index++) {
      months.push(index);
    }
    return months;
  }

  getYears() {
    let years: number[] = [];
    let startIndex = (new Date).getFullYear();
    for(var index=startIndex; index < startIndex + 10; index++) {
      years.push(index);
    }
    return years;
  }


  get cf() {return this.cardForm.controls}
  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.getSavedCards()
  }

  cancelForm(form: FormGroup) {
    this.isFormActive = false
    this.collapseKey = "#collapseExample"
    this.resetForm()
  } 

  submitForm(form: FormGroup) {
    this.collapseKey = ""
    this.isSubmitted = true
    let date = new Date()
    console.log(this.cf.expiryYear.value, this.cf.expiryMonth.value);
    console.log(date.getFullYear(), date.getMonth());
    if (this.cf.expiryYear.value === date.getFullYear && this.cf.expiryMonth.value <= date.getMonth()) {
      console.log("Fail");
      this.errorMessageHandler('Your Card is expired')
    } else {
      console.log("Pass1");
      if (form.valid) {
        this.isFormActive = false
        this.collapseKey = "#collapseExample";
        this.postCard(form);
        this.resetForm()
      }
    }
  }

  delete(id: string) {
    if(confirm('Are you sure to delete this card?')) {
      this.deleteCard(id);
    }
  }

  resetForm() {
    this.cardForm.reset();
    this.isSubmitted = false
  }

  errorMessageHandler(message) {
    this.errorMessage = message;
    setTimeout( () => this.errorMessage = "", 3000);
  }

  getSavedCards() {
    this.cardService.getCards().subscribe(
      res => { console.log(res);
      this.cards = res['cards']},
      err => { this.errorMessageHandler(err.error.message)}
    )
  }

  postCard(form: FormGroup) {
    this.cardService.postCard(form.value).subscribe(
      res => { console.log(res);let newCard = res['card']; 
      this.cards.push(newCard);
    }, err => { this.errorMessageHandler(err.error.message) }
    )
  }

  deleteCard(id: string) {
    this.cardService.deleteCard(id).subscribe(
      res => { 
        this.cards = this.cards.filter((card) => { return card._id != id });
        this.successMessage = res['message']; 
        setTimeout(()=>{this.successMessage = ""}) 
    }, err => { this.errorMessageHandler(err.error.message)})
  }

}
