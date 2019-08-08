import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferGroupComponent } from './offer-group.component';

describe('OfferGroupComponent', () => {
  let component: OfferGroupComponent;
  let fixture: ComponentFixture<OfferGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
