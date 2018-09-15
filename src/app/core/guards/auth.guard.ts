import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
              private router: Router) {
  };

  canActivate() {
    return this._authService.isLoggedIn
      .pipe(map( v => {
        if(v === false) {
          this.router.navigate(['/auth', 'login']);
        }

        return v;
      }));
  }
}
