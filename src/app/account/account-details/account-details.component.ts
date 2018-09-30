import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpError} from '../../core/models/HttpError';
import {AuthService} from '../../core/services/auth.service';
import {User} from '../../core/models/User';
import {UserService} from '../../core/services/user.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent {
  public marketingForm: FormGroup;
  public bookingForm: FormGroup;
  public passwordForm: FormGroup;
  public emailForm: FormGroup;
  public personalForm: FormGroup;

  public errors = {
    marketingForm: null,
    bookingForm: null,
    passwordForm: null,
    emailForm: null,
    personalForm: null,
  };

  public readonly user: User;

  constructor(private fb: FormBuilder,
              private _authService: AuthService,
              private notificationService: NotificationsService,
              private _userService: UserService) {
    this.user = this._authService.loggedInUser;

    this.personalForm = this.fb.group({
      username: new FormControl(this.user.username, [Validators.required]),
      firstname: new FormControl(this.user.first, [Validators.required]),
      lastname: new FormControl(this.user.last, [Validators.required]),
      homephone: new FormControl(this.user.home, [Validators.required]),
      mobilephone: new FormControl(this.user.mobile, [Validators.required]),
      address: new FormControl(this.user.address, [Validators.required])
    });

    this.emailForm = this.fb.group({
      email: new FormControl(this.user.email, [Validators.required]),
      email_confirmation: new FormControl(null, [Validators.required])
    });

    this.passwordForm = this.fb.group({
      password: new FormControl(null, [Validators.required]),
      password_confirmation: new FormControl(null, [Validators.required])
    });

    this.marketingForm = this.fb.group({
      holiday_perm: new FormControl(this.user.holiday_perm, []),
      promotion_perm: new FormControl(this.user.promotion_perm, [])
    });

    this.bookingForm = this.fb.group({});
  }

  public updateDetails() {
    this.errors.personalForm = null;

    this._userService.updatePersonal({
      username: this.personalForm.get('username').value,
      first: this.personalForm.get('firstname').value,
      last: this.personalForm.get('lastname').value,
      home: this.personalForm.get('homephone').value,
      mobile: this.personalForm.get('mobilephone').value,
      address: this.personalForm.get('address').value,
    })
      .subscribe((user: User) => {
        this._authService.loggedInUser = user;

        this.notificationService
          .success('Success!', 'New details have now been saved', {
            timeOut: 2000
          });
      }, (err: HttpError) => {
        this.errors.personalForm = err;

        this.notificationService
          .error('Update failed!', 'Unable to save your new details', {
            timeOut: 2000
          });
      });
  }

  public updateEmail() {
    this.errors.emailForm = null;

    this._userService.updateEmail({
      email: this.emailForm.get('email').value,
      email_confirmation: this.emailForm.get('email_confirmation').value
    })
      .subscribe((user: User) => {
        this._authService.loggedInUser = user;

        this.notificationService
          .success('Success!', 'New email address has been saved', {
            timeOut: 2000
          });
      }, (err: HttpError) => {
        this.errors.emailForm = err;

        this.notificationService
          .error('Update failed!', 'Unable to save your new email address', {
            timeOut: 2000
          });
      });
  }

  public updatePassword() {
    this.errors.passwordForm = null;

    this._userService.updatePassword({
      password: this.passwordForm.get('password').value,
      password_confirmation: this.passwordForm.get('password_confirmation').value
    })
      .subscribe(() => {
        this.notificationService
          .success('Success!', 'New password has been saved', {
            timeOut: 2000
          });
      }, (err: HttpError) => {
        this.errors.passwordForm = err;

        this.notificationService
          .error('Update failed!', 'Unable to save your new password', {
            timeOut: 2000
          });
      });
  }

  public updateMarketingDetails() {
    this.errors.marketingForm = null;

    this._userService.updateMarketing({
      xmasCardOK: this.marketingForm.get('holiday_perm').value,
      promoMaterial: this.marketingForm.get('promotion_perm').value
    })
      .subscribe(() => {
        this.notificationService
          .success('Success!', 'New preferences have been saved', {
            timeOut: 2000
          });
      }, (err: HttpError) => {
        this.errors.marketingForm = err;

        this.notificationService
          .error('Update failed!', 'Unable to save your new preferences', {
            timeOut: 2000
          });
      });
  }

  public updateBookingDetails() {

  }

  public getErrorMessage(formControl: string) {
    switch (formControl) {
      case 'email': {
        return this.emailForm.get('email').hasError('required') ? 'You must enter a value' :
          this.emailForm.get('email').hasError('email') ? 'Not a valid email' : '';
      }
      case 'firstname': {
        return this.personalForm.get('firstname').hasError('required') ? 'You must enter a value' : '';
      }
      case 'lastname': {
        return this.personalForm.get('lastname').hasError('required') ? 'You must enter a value' : '';
      }
      case 'homephone': {
        return this.personalForm.get('homephone').hasError('required') ? 'You must enter a value' : '';
      }
      case 'mobilephone': {
        return this.personalForm.get('mobilephone').hasError('required') ? 'You must enter a value' : '';
      }
      case 'address': {
        return this.personalForm.get('mobilephone').hasError('required') ? 'You must enter a value' : '';
      }
      case 'password_confirm': {
        return this.passwordForm.get('password_confirmation').hasError('required') ? 'You must enter a value' :
          this.passwordForm.get('password').value !== this.passwordForm.get('password_confirmation').value ? 'Passwords do not match' : '';
      }
    }
  }
}
