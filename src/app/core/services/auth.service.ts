import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {BaseService} from './base.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {User} from '../models/User';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  public loginEvent: BehaviorSubject<User> = new BehaviorSubject(null);
  public logoutEvent: BehaviorSubject<null> = new BehaviorSubject(null);

  private _loggedInUser: User;

  constructor(private http: HttpClient) {
    super();

    const token = localStorage.getItem('token');

    if(!isNullOrUndefined(token)) {
      this.http.get(environment.urls.api + '/user')
        .subscribe((r) => {
          const user = new User(r);

          this.setLoggedInState(user);
        });
    }
  }

  public get isLoggedIn(): Observable<boolean> {
    if (isNullOrUndefined(this._loggedInUser)) {
      return this.http.get(environment.urls.api + '/user')
        .pipe(
          map(r => {
            const user = new User(r);

            this.setLoggedInState(user);

            return true;
          }),
          catchError(e => of(false))
        );
    }

    return of(true);
  }

  public get loggedInUser(): User {
    return this._loggedInUser;
  }

  public set loggedInUser(value: User) {
    this._loggedInUser = value;
  }

  public logout() {
    this.http.delete(environment.urls.api + '/auth')
      .subscribe(() => {
        this.logoutEvent.next(null);

        localStorage.removeItem('token');
      });
  }

  public register(userData: any): Observable<any> {
    return this.http.post(environment.urls.public_api + '/auth/register', userData)
      .pipe(catchError(this.handleErrorObservable));
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(environment.urls.public_api + '/auth', {email: email, password: password})
      .pipe(
        switchMap((r: any) => {
            this.storeToken(r.token);

            return this.http.get(environment.urls.api + '/user')
              .pipe(map(r => {
                const user = new User(r);

                this.setLoggedInState(user);

                return user;
              }));
          }
        ),
        catchError(this.handleErrorObservable)
      );
  }

  /**
   * Private methods
   */

  /**
   * Take a JQT token and store it in a cookie for re-use
   * @param token
   */
  private storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  /**
   *
   * @param user
   */
  private setLoggedInState(user: User) {
    this.loginEvent.next(user);
    this._loggedInUser = user;
  }
}
