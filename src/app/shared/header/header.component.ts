import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../core/models/User';
import {AuthService} from '../../core/services/auth.service';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: User;

  public navList: Array<{ title: string, route: string, icon?: string, active: boolean }> = [
    {title: 'Home', route: 'home', active: false},
    {title: 'Accommodations', route: 'accommodation', active: false},
    {title: 'Availability', route: 'availability', active: false},
    {title: 'Recommendations', route: 'recommendation', active: false},
    {title: 'Help', route: 'help', active: false},
    {title: 'Contact Us', route: 'contact', active: false},
    {title: 'Login', route: 'auth/login', icon: 'fa-sign-in', active: false},
  ];

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private _authService: AuthService,
              private router: Router) {

  }

  ngOnInit() {
    this._authService.loginEvent
      .pipe(
        filter(u => !isNullOrUndefined(u)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user: User) => {
        this.user = user;
        this.navList.splice(this.navList.length - 1, 1, {
          title: user.getFullName(),
          route: 'account',
          icon: 'fa-user',
          active: true
        });
      });

    this.router.events
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe((e: any) => this.navList
        .forEach(i => i.active = e.urlAfterRedirects.startsWith(`/${i.route}`))
      );
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
