import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {filter, subscribeOn, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  public navList: Array<{ title: string, route: string, icon?: string, active: boolean }> = [
    {title: 'Profile', route: 'details', active: true, icon: 'fa-address-card'}
  ];

  public subNavList: Array<{ title: string, route: string, icon?: string, active: boolean }> = [
    {title: 'Active', route: 'active', active: false, icon: 'fa-book'},
    {title: 'Previous', route: 'historic', active: false, icon: 'fa-align-justify'}
  ];

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private router: Router) {
  }

  public ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter(e => e instanceof NavigationEnd)
      )
    .subscribe((e: any) => {
      this.navList[0].active = e.urlAfterRedirects.startsWith('/account/details');

      this.subNavList[0].active = e.urlAfterRedirects.startsWith('/account/bookings/active');
      this.subNavList[1].active = e.urlAfterRedirects.startsWith('/account/bookings/historic');
    })
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
