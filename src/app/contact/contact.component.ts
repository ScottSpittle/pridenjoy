import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public map = {
    zoom: 16,
    center: {longitude: -0.190031, latitude: 54.087865}
  };

  public name = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public phone = new FormControl('', [Validators.minLength(11)]);

  constructor() { }

  ngOnInit() {
  }

  getErrorMessage(formControl: string) {
    switch (formControl) {
      case 'email': {
        return this.email.hasError('required') ? 'You must enter a value' :
          this.email.hasError('email') ? 'Not a valid email' : '';
      }
      case 'name': {
        return this.name.hasError('required') ? 'You must enter a value' : '';
      }
      case 'phone': {
        return this.phone.hasError('minlength') ? 'Invalid number length' : '';
      }
    }
  }
}
