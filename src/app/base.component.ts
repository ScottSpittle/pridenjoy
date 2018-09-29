import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

export class BaseComponent implements OnDestroy {
  public ngUnsubscribe: Subject<any> = new Subject();

  public isTablet: boolean = false;
  public isMobile: boolean = false;
  public isDesktop: boolean = false;

  constructor(media: ObservableMedia) {
    media.asObservable()
      .subscribe((change: MediaChange) => {
        this.isTablet = change.mqAlias === 'md';
        this.isMobile = change.mqAlias === 'sm' || change.mqAlias === 'xs';
        this.isDesktop = !this.isTablet && !this.isMobile;
      });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
