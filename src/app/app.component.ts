import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatIconRegistry, MatSidenav} from '@angular/material';
import {EventItem} from './core/models/EventItem';
import {NavigationEnd, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {BaseComponent} from './base.component';
import {ObservableMedia} from '@angular/flex-layout';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
  public sideNavOpenState: boolean = false;

  public eventList: Array<EventItem> = [];
  public showEvents: boolean = true;

  @ViewChild(MatSidenav)
  public sidenav: MatSidenav;

  public navList: Array<any> = [
    {title: 'Home', route: 'home', icon: 'fa-home', active: false},
    {title: 'Accommodations', route: 'accommodation', icon: 'fa-hotel', active: false, icon_padding: '5px'},
    {title: 'Availability', route: 'availability', icon: 'fa-calendar', active: false},
    {title: 'Recommendations', route: 'recommendation', icon: 'fa-thumbs-up', active: false},
    {title: 'Contact Us', route: 'contact', icon: 'fa-envelope', active: false}
  ];

  public navListAuth: Array<any> = [
    {title: 'Login', route: 'auth/login', icon: 'fa-sign-in', active: false}
  ];

  constructor(private matIconRegistry: MatIconRegistry,
              private router: Router,
              elementRef: ElementRef,
              private media: ObservableMedia) {
    super(media);
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

    const hammertime = new Hammer(elementRef.nativeElement, { velocity: 0.3, threshold: 900 });
    hammertime.on('panright', (ev) => {
      if (this.isMobile && ev.overallVelocity > 0) {
        console.log(ev.overallVelocity, ev.distance);
        this.sidenav.open();
      }
    });
    hammertime.on('panleft', (ev) => {
      this.sidenav.close();
    });
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
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe((s: any) => {
        this.showEvents = !s.urlAfterRedirects.startsWith('/account');

        this.navList
          .forEach(i => i.active = s.urlAfterRedirects.startsWith(`/${i.route}`));
        this.navListAuth
          .forEach(i => i.active = s.urlAfterRedirects.startsWith(`/${i.route}`));
      });
  }

  public toggleSideNav() {
    if (this.isMobile) {
      this.sidenav.open();
    }
  }

  public ngOnDestroy() {
    super.ngOnDestroy();
  }
}
