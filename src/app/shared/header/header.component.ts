import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../core/models/User';
import {AuthService} from '../../core/services/auth.service';
import {filter, takeUntil} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {NavigationEnd, Router} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output()
  menuClicked: EventEmitter<boolean> = new EventEmitter();

  public user: User;

  public navList: Array<any> = [
    {title: 'Home', route: 'home', icon: 'fa-home', active: false, padding: '0.5em 1.5em 0.5em 1em'},
    {title: 'Accommodations', route: 'accommodation', icon: 'fa-hotel', active: false, icon_padding: '5px',
      padding: '0.5em 1.5em 0.5em 0.5em'},
    {title: 'Availability', route: 'availability', icon: 'fa-calendar', active: false, padding: '0.5em 1.5em 0.5em 1em'},
    {title: 'Recommendations', route: 'recommendation', icon: 'fa-thumbs-up', active: false, padding: '0.5em 1.5em 0.5em 1em'},
    {title: 'Contact Us', route: 'contact', icon: 'fa-envelope', active: false, padding: '0.5em 1.5em 0.5em 1em'}
  ];

  public navListAuth: Array<any> = [
    {title: 'Login', route: 'auth/login', icon: 'fa-sign-in', active: false, padding: '0.5em 1.3em 0.5em 1em'}
  ];

  constructor(private _authService: AuthService,
              private router: Router,
              private media: ObservableMedia) {
    super(media);
  }

  ngOnInit() {
    this._authService.loginEvent
      .pipe(
        filter(u => !isNullOrUndefined(u)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user: User) => {
        this.user = user;
        this.navListAuth.splice(this.navListAuth.length - 1, 1, {
          title: user.getFullName(),
          route: 'account',
          icon: 'fa-user',
          active: false,
          padding: '0.5em 1.3em 0.5em 1em'
        });
      });

    this._authService.logoutEvent
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.user = null;

        this.navListAuth.splice(this.navListAuth.length - 1, 1, {
          title: 'Login',
          route: 'auth/login',
          icon: 'fa-sign-in',
          active: false,
          padding: '0.5em 1.3em 0.5em 1em'
        });
      });

    this.router.events
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe((e: any) => {
          this.navList
            .forEach(i => i.active = e.urlAfterRedirects.startsWith(`/${i.route}`));
          this.navListAuth
            .forEach(i => i.active = e.urlAfterRedirects.startsWith(`/${i.route}`));
        }
      );
  }

  public ngOnDestroy() {
    super.ngOnDestroy();
  }

}
