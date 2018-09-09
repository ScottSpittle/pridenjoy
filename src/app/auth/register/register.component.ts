import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public username = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public password_confirm = new FormControl('', [Validators.required]);
  public firstname = new FormControl('', [Validators.required]);
  public lastname = new FormControl('', [Validators.required]);
  public homephone = new FormControl('', [Validators.required]);
  public mobilephone = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
  }

  getErrorMessage(formControl: string) {
    switch (formControl) {
      case 'email': {
        return this.email.hasError('required') ? 'You must enter a value' :
          this.email.hasError('email') ? 'Not a valid email' : '';
      }
      case 'username': {
        return this.username.hasError('required') ? 'You must enter a value' : '';
      }
      case 'password': {
        return this.username.hasError('required') ? 'You must enter a value' : '';
      }
      case 'password_confirm': {
        return this.username.hasError('required') ? 'You must enter a value' :
          this.password !== this.password_confirm ? 'Passwords do not match' : '';
      }
      case 'firstname': {
        return this.firstname.hasError('required') ? 'You must enter a value' : '';
      }
      case 'lastname': {
        return this.lastname.hasError('required') ? 'You must enter a value' : '';
      }
      case 'homephone': {
        return this.homephone.hasError('required') ? 'You must enter a value' : '';
      }
      case 'mobilephone': {
        return this.mobilephone.hasError('required') ? 'You must enter a value' : '';
      }
    }
  }
}
