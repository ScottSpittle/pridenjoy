import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {HttpError} from '../../core/models/HttpError';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registrationForm: FormGroup;
  public error: HttpError;

  constructor(private _authService: AuthService,
              private fb: FormBuilder,
              private notificationService: NotificationsService,
              private router: Router) {
    this.registrationForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password_confirm: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      homephone: new FormControl('', [Validators.required]),
      mobilephone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      holiday_perm: new FormControl(false, []),
      promotion_perm: new FormControl(false, [])
    });
  }

  public getErrorMessage(formControl: string) {
    try {
      switch (formControl) {
        case 'email': {
          return this.registrationForm.get('email').hasError('required') ? 'You must enter a value' :
            this.registrationForm.get('email').hasError('email') ? 'Not a valid email' : '';
        }
        case 'username': {
          return this.registrationForm.get('username').hasError('required') ? 'You must enter a value' : '';
        }
        case 'password': {
          return this.registrationForm.get('password').hasError('required') ? 'You must enter a value' : '';
        }
        case 'password_confirm': {
          return this.registrationForm.get('password_confirm').hasError('required') ? 'You must enter a value' :
            this.registrationForm.get('password').value !== this.registrationForm.get('password_confirm').value ? 'Passwords do not match' : '';
        }
        case 'firstname': {
          return this.registrationForm.get('firstname').hasError('required') ? 'You must enter a value' : '';
        }
        case 'lastname': {
          return this.registrationForm.get('lastname').hasError('required') ? 'You must enter a value' : '';
        }
        case 'homephone': {
          return this.registrationForm.get('homephone').hasError('required') ? 'You must enter a value' : '';
        }
        case 'mobilephone': {
          return this.registrationForm.get('mobilephone').hasError('required') ? 'You must enter a value' : '';
        }
        case 'address': {
          return this.registrationForm.get('mobilephone').hasError('required') ? 'You must enter a value' : '';
        }
        default: {
          console.warn('dEFAULT HIT', formControl);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  public register() {
    this.error = null;

    this._authService.register({
      email: this.registrationForm.get('email').value,
      username: this.registrationForm.get('username').value,
      password: this.registrationForm.get('password').value,
      password_confirmation: this.registrationForm.get('password_confirm').value,
      first: this.registrationForm.get('firstname').value,
      last: this.registrationForm.get('lastname').value,
      home: this.registrationForm.get('homephone').value,
      mobile: this.registrationForm.get('mobilephone').value,
      address: this.registrationForm.get('address').value,
      holiday_perm: this.registrationForm.get('holiday_perm').value,
      promotion_perm: this.registrationForm.get('promotion_perm').value,
    })
      .subscribe((res) => {
        this.router.navigate(['/auth', 'login'])
          .then(() => {
            this.notificationService
              .success('Successfully registered!', 'Please login to continue.', {
                timeOut: 5000
              });

            window.scroll(0,0);
          });
      }, (e: HttpError) => {
        this.error = e;
      });
  }
}
