import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Reservation } from '../Models/Reservation';


@Injectable()
export class ReservationService {

  private BASE_URL = "https://comp4976-serverside.azurewebsites.net/api/reservation";
  constructor(private http: Http) { }

  getReservations(): Promise<Reservation[]> {
    return this.http.get(this.BASE_URL)
      .toPromise()
      .then(response => response.json() as Reservation[])
      .catch(this.handleError);
  }

  getReservationById(id: number): Promise<Reservation> {
    return this.getReservations()
      .then(result => result.find(reservation => reservation.reservationId === id));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  
  create(newReservation: Reservation): Promise<Reservation> {
    return this.http
      .post(this.BASE_URL, JSON.stringify(newReservation), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
