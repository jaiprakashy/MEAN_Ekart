import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveOffersComponent } from './live-offers.component';

describe('LiveOffersComponent', () => {
  let component: LiveOffersComponent;
  let fixture: ComponentFixture<LiveOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
