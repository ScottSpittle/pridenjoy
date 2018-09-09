import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecommendationRoutingModule } from './recommendation-routing.module';
import { RecommendationComponent } from './recommendation.component';
import {MatCardModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RecommendationRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [RecommendationComponent]
})
export class RecommendationModule { }
