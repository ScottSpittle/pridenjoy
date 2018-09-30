import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public updatePersonal(data: any): Observable<any> {
    return this.http.put(environment.urls.api + '/user/personal', data)
      .pipe(map( r => new User(r)),
        catchError(this.handleErrorObservable));
  }

  public updateEmail(data: any): Observable<any> {
    return this.http.put(environment.urls.api + '/user/email', data)
      .pipe(map( r => new User(r)),
        catchError(this.handleErrorObservable));
  }

  public updatePassword(data: any): Observable<any> {
    return this.http.put(environment.urls.api + '/user/password', data)
      .pipe(catchError(this.handleErrorObservable));
  }

  public updateMarketing(data: any): Observable<any> {
    return this.http.put(environment.urls.api + '/user/marketing', data)
      .pipe(catchError(this.handleErrorObservable));
  }
}
