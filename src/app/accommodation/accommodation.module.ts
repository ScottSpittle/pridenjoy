import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccommodationRoutingModule } from './accommodation-routing.module';
import { AccommodationComponent } from './accommodation.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule, MatTabsModule, MatTooltipModule} from '@angular/material';
import {NgImageSliderModule} from 'ng-image-slider';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AccommodationRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    NgImageSliderModule,
    HttpClientModule,
    MatTooltipModule,
    MatTabsModule
  ],
  declarations: [AccommodationComponent]
})
export class AccommodationModule { }
