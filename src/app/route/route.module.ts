
import { BoatListComponent } from './../boat-list/boat-list.component';
import { ReservationComponent } from './../reservation/reservation.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'reservation', component: ReservationComponent },
  { path: 'boats', component: BoatListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
