import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailabilityRoutingModule } from './availability-routing.module';
import { AvailabilityComponent } from './availability.component';
import {CalendarModule} from 'angular-calendar';
import {MatButtonModule, MatCardModule, MatRippleModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    AvailabilityRoutingModule,
    CalendarModule,
    MatButtonModule,
    MatRippleModule,
    FlexLayoutModule,
    MatCardModule
  ],
  declarations: [AvailabilityComponent]
})
export class AvailabilityModule { }
