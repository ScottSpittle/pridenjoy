import {Component, Input} from '@angular/core';
import {HttpError} from '../../core/models/HttpError';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss']
})
export class ErrorListComponent {
  @Input() httpError: HttpError;

  constructor() { }
}
