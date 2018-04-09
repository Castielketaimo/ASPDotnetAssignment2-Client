import { ReservationService } from './service/reservation.service';
import { Reservation } from './Models/Reservation';
import { AuthService } from './service/auth.service';
import { BoatsService } from './service/boats.service';
import { AppRoutingModule } from './route/route.module';
import { SignupComponent } from './auth/signup/signup.component';
import { ReservationComponent } from './reservation/reservation.component';
import { NavComponent } from './nav/nav.component';
import { BoatListComponent } from './boat-list/boat-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from 'mydaterangepicker';


@NgModule({
  declarations: [
    AppComponent,
    BoatListComponent,
    NavComponent,
    ReservationComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MyDateRangePickerModule
  ],
  providers: [
    BoatsService,
    AuthService,
    ReservationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
