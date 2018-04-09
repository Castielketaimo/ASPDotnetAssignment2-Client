import { AuthService } from './../../service/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from './../../Models/User';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  _logedIn : boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  newUser: User = new User();
  onSubmit() {
    console.log(this.myForm);
    this.newUser.UserName = this.myForm.get("userName").value;
    this.newUser.Password = this.myForm.get("password").value;

    alert(this.authService.login(this.newUser));
    if (!this.newUser) { return; }
    this.authService.login(this.newUser)
      .then(newUser => {
        this.myForm.reset();
        this.router.navigate(['/reservation']);
      });
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
}
