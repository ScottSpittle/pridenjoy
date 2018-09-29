import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from './shared/shared.module';
import {
  MatExpansionModule,
  MatIconModule,
  MatIconRegistry,
  MatListModule, MatSidenavModule,
  MatTabsModule, MatToolbarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing.module';
import {AgmCoreModule} from '@agm/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
import {AuthGuard} from './core/guards/auth.guard';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {environment} from '../environments/environment';
import {CommonModule} from '@angular/common';

declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y',
    });
    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: environment.keys.maps,
      libraries: ['geometry']
    }),
    HttpClientModule,
    SimpleNotificationsModule.forRoot({
      showProgressBar: false
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
    MatIconRegistry,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig},
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
