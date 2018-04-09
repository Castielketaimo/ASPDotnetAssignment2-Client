import { User } from './../Models/User';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  private loggedIn: boolean = false
  private BASE_URL = "https://comp4976-serverside.azurewebsites.net";
  
  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  accessToken = "";
  constructor(private http: Http, private router: Router) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  get isLoggedIn() {
    return this.loggedIn;
  }

  get currentLogin() {
    return this.currentLogin
  }
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

  signup(newUser: User): Promise<User> {
    return this.http
      .post(this.BASE_URL += "/api/AccountAPI/Register", JSON.stringify(newUser), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  
  login(loginUser: User): Promise<any> {
    let url: string = this.BASE_URL + '/connect/token';

    var credential = {
      username: loginUser.UserName,
      password: loginUser.Password,
      grant_type: 'password'
    };

    var body = "";

    for (var key in credential) {
      if (body.length) {
        body += "&";
      }

      body += key + "=";
      body += encodeURIComponent(credential[key]);
    }

    return this.http
      .post(url, body, { headers: this.headers })
      .toPromise()
      .then(res => this.loggedIn = true)
      .catch(this.handleError);

  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
