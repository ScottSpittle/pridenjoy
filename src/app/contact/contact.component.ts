import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HttpError} from '../core/models/HttpError';
import {NotificationsService} from 'angular2-notifications';
import {isNullOrUndefined} from 'util';

// todo: add types for this
declare var google: any;

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

  public contactForm: FormGroup;

  @ViewChild("cform")
  cform: NgForm;

  public error: HttpError;
  public gotDirections: boolean = false;
  public origin: any;
  public post_code: any;

  public loading = {
    directions: false,
    contact: false,
  };

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private notificationService: NotificationsService) {
    this.contactForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
      method: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

  }

  public getErrorMessage(formControl: string) {
    switch (formControl) {
      case 'email': {
        return this.contactForm.get('email').hasError('required') ? 'You must enter a value' :
          this.contactForm.get('email').hasError('email') ? 'Not a valid email' : '';
      }
      case 'name': {
        return this.contactForm.get('name').hasError('required') ? 'You must enter a value' : '';
      }
      case 'phone': {
        return this.contactForm.get('phone').hasError('required') ? 'You must enter a value' : '';
      }
      case 'message': {
        return this.contactForm.get('message').hasError('required') ? 'You must enter a value' : '';
      }
      case 'method': {
        return this.contactForm.get('method').hasError('required') ? 'You must choose a contact method' : '';
      }
    }
  }

  public contact() {
    this.error = null;
    this.loading.contact = true;

    this.http.post(environment.urls.public_api + '/contact', {
      email: this.contactForm.get('email').value,
      name: this.contactForm.get('name').value,
      phone: this.contactForm.get('phone').value,
      message: this.contactForm.get('message').value,
      method: this.contactForm.get('method').value
    })
      .subscribe((r) => {
        this.loading.contact = false;
        this.cform.resetForm();

        this.notificationService
          .success('Message sent', 'Thank you for getting in touch.', {
            timeOut: 5000
          });
      }, (e) => {
        this.loading.contact = false;
        let eList = [];

        if (e.error) {
          if (e.error.errors) {
            if (typeof e.error.errors === 'object') {
              Object.keys(e.error.errors.detail)
                .forEach(k => {
                  eList = eList.concat(e.error.errors.detail[k])
                });
            }
          }
        }

        if (eList.length === 0) {
          eList = ['An error occurred'];
        }

        this.error = {
          code: e.status,
          errors: eList
        };
      });
  }

  public getDirections() {
    if (isNullOrUndefined(this.post_code) || this.post_code === '') return;
    this.loading.directions = true;

    let geocoder = new google.maps.Geocoder();
    var address = this.post_code;

    geocoder.geocode({'address': address},
      (results, status) => {
        if (status === 'OK') {
          this.origin = results[0].geometry.location;
        } else {
          this.notificationService
            .error('Directions Failed', 'Unable to find directs from that location.', {
              timeOut: 5000
            });
        }

        this.gotDirections = status === 'OK';

        this.loading.directions = false;
        window.dispatchEvent(new Event('resize'));
      });
  }

  public download(file: string) {
    window.open(file, 'Download');
  }
}
