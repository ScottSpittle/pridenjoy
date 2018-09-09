import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home.routing.module';
import {MatCardModule} from '@angular/material';
import {NgImageSliderModule} from 'ng-image-slider';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    NgImageSliderModule,
    HttpClientModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
