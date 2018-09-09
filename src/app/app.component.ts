import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {EventItem} from './models/EventItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public eventList: Array<EventItem> = [];

  constructor(private matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  public ngOnInit() {
    this.eventList.push(new EventItem({
      title: 'You win again - Bee Gees Tribute',
      table_data: [
        { icon: 'fa-calendar', text: '28-06-2018' },
        { icon: 'fa-link', text: 'http://google.com' },
        { icon: 'fa-map-marker', text: 'The Spa' },
      ]
    }));
    this.eventList.push(new EventItem({
      title: 'You win again - Bee Gees Tribute',
      table_data: [
        { icon: 'fa-calendar', text: '28-06-2018' },
        { icon: 'fa-link', text: 'http://google.com' },
        { icon: 'fa-map-marker', text: 'The Spa' },
      ]
    }));
    this.eventList.push(new EventItem({
      title: 'You win again - Bee Gees Tribute',
      table_data: [
        { icon: 'fa-calendar', text: '28-06-2018' },
        { icon: 'fa-link', text: 'https://material.angular.io/components/expansion/overview' },
        { icon: 'fa-map-marker', text: 'The Spa' },
      ]
    }))
  }
}
