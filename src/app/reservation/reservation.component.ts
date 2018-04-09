import { AuthService } from './../service/auth.service';
import { BoatsService } from './../service/boats.service';

import { Reservation } from './../Models/Reservation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { ReservationService } from '../service/reservation.service';
import { IMyDrpOptions, IMyDateRange, IMyDateRangeModel } from 'mydaterangepicker';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Boat } from '../models/boat';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  myForm: FormGroup;
  reservations: Reservation[];
  boats: Boat[];
  newReservation: Reservation = new Reservation();;
  selectedBoat : Boat;
  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private boatService: BoatsService,
    private authService: AuthService
  ) { 
  }

  getReservations(): void {
    this.reservationService.getReservations()
      .then(reservations => this.reservations = reservations);
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    this.newReservation.startDateTime = event.beginDate.year + '-'+event.beginDate.month+'-' + event.beginDate.day+'T00:00:00';
    this.newReservation.endDateTime = event.endDate.year + '-' + event.endDate.month + '-' + event.endDate.day + 'T00:00:00';
  }

  getBoats(): void {
    this.boatService.getFleets()
      .then(boats => this.boats = boats);
  }
  ngOnInit(): void {
    this.getReservations();
    this.getBoats();
    this.myForm = this.formBuilder.group({
      // Empty string means no initial value. Can be also specific date range for example:
      // {beginDate: {year: 2018, month: 10, day: 9}, endDate: {year: 2018, month: 10, day: 19}}
      // which sets this date range to initial value. It is also possible to set initial
      // value using the selDateRange attribute.

      myDateRange: ['', Validators.required]
      // other controls are here...
    });
  }

  setDateRange(): void {
    // Set date range (today) using the patchValue function
    let date = new Date();
    this.myForm.patchValue({
      myDateRange: {
        beginDate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        },
        endDate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  onOptionsSelected(event) {
    this.selectedBoat = event;
    this.newReservation.boat = this.selectedBoat;
    this.newReservation.boatId = this.selectedBoat.boatId;
  }

  clearDateRange(): void {
    // Clear the date range using the patchValue function
    this.myForm.patchValue({ myDateRange: '' });
  }
  
  onSubmit(){
    this.newReservation.boatId = 2;
    this.newReservation.createdBy = 'castiel',
    this.add(this.newReservation);
  }
  add(newReservation: Reservation): void {
    if (!newReservation) { return; }
    this.reservationService.create(newReservation)
      .then(newReservation => {
        this.router.navigate(['./reservations']);
      });
  }

  delete(delReservation: Reservation): void {
    this.reservationService
      .delete(delReservation.reservationId)
      .then(() => {
        this.reservations = this.reservations.filter(r => r !== delReservation);
      });
  }
}
