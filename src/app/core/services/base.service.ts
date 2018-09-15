import {Observable, of, throwError} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {HttpError} from '../models/HttpError';

export class BaseService {
  constructor() {

  }

  public handleErrorObservable(response: any): Observable<HttpError> {
    const errors = [];

    if (!isNullOrUndefined(response.error)) {
      if (!isNullOrUndefined(response.error.errors)) {
        if (!isNullOrUndefined(response.error.errors.detail)) {
          Object.keys(response.error.errors.detail)
            .forEach(key => {
              response.error.errors.detail[key]
                .forEach(e => errors.push(e));
            });
        } else {
          errors.push(response.error.errors.title);
        }
      }
    }

    if (!errors.length) {
      errors.push('Error');
    }

    return throwError({
      code: response.status,
      errors: errors
    })
  }
}
