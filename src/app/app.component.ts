import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {EventItem} from './core/models/EventItem';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public eventList: Array<EventItem> = [];
  public showEvents: boolean = true;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private matIconRegistry: MatIconRegistry,
              private router: Router) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  public ngOnInit() {
    this.eventList.push(new EventItem({
      title: 'You win again - Bee Gees Tribute',
      table_data: [
        {icon: 'fa-calendar', text: '28-06-2018'},
        {icon: 'fa-link', text: 'http://google.com'},
        {icon: 'fa-map-marker', text: 'The Spa'},
      ]
    }));
    this.eventList.push(new EventItem({
      title: 'You win again - Bee Gees Tribute',
      table_data: [
        {icon: 'fa-calendar', text: '28-06-2018'},
        {icon: 'fa-link', text: 'http://google.com'},
        {icon: 'fa-map-marker', text: 'The Spa'},
      ]
    }));
    this.eventList.push(new EventItem({
      title: 'You win again - Bee Gees Tribute',
      table_data: [
        {icon: 'fa-calendar', text: '28-06-2018'},
        {icon: 'fa-link', text: 'https://material.angular.io/components/expansion/overview'},
        {icon: 'fa-map-marker', text: 'The Spa'},
      ]
    }))

    this.router.events
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter( e => e instanceof NavigationEnd)
      )
      .subscribe( (s: any) => {
        console.log(s);
        this.showEvents = !s.urlAfterRedirects.startsWith('/account')
      })
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
