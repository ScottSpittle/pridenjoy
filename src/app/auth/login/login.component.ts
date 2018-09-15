import {Component} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {User} from '../../core/models/User';
import {HttpError} from '../../core/models/HttpError';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public credentials: {
    email: string,
    password: any
  } = {email: null, password: null};

  public error: HttpError;

  constructor(private _authService: AuthService,
              private router: Router) {

  }

  public login() {
    this.error = null;

    this._authService.login(this.credentials.email, this.credentials.password)
      .subscribe((user: User) => {
        this.router.navigate(['/account']);
      }, (err: HttpError) => {
        this.error = err;
      });
  }
}
