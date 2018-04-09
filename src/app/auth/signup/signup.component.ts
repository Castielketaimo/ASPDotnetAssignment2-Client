import { AuthService } from './../../service/auth.service';

import { User } from './../../Models/User';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  newUser: User = new User();
  onSubmit() {
    console.log(this.myForm);
    this.newUser.UserName = this.myForm.get("userName").value;
    this.newUser.Email = this.myForm.get("email").value;
    this.newUser.Password = this.myForm.get("password").value;
    this.newUser.FirstName = this.myForm.value.firstName;
    this.newUser.LastName = this.myForm.get("lastName").value;

    this.newUser.Street = this.myForm.get("street").value;
    this.newUser.City = this.myForm.get("city").value;
    this.newUser.Province = this.myForm.get("province").value;
    this.newUser.PostalCode = this.myForm.get("postalCode").value;
    this.newUser.Country = this.myForm.get("country").value;
    this.newUser.MobileNumber = this.myForm.get("mobilePhone").value;
    this.newUser.SailingExperience = this.myForm.get("sailingExperience").value;

 
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      province: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      mobilePhone: new FormControl(null, Validators.required),
      sailingExperience: new FormControl(null, Validators.required)
    });
  }
};
