import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from './shared/shared.module';
import {
  MatExpansionModule,
  MatIconModule,
  MatIconRegistry,
  MatListModule,
  MatTabsModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing.module';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBorXyjV7kGvWoYrZsautKm9cYzKe7s2OY',
      libraries: ['geometry']
    }),
  ],
  providers: [MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
