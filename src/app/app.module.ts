import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './shared/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OfferGroupComponent } from './offer-group/offer-group.component';
import { OfferComponent } from './offer/offer.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LiveOffersComponent } from './live-offers/live-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    OfferGroupComponent,
    OfferComponent,
    FooterComponent,
    LoginComponent,
    UserProfileComponent,
    LiveOffersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, NgbActiveModal, UserService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
