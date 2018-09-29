import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {HelpRoutingModule} from './help-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [HelpComponent]
})
export class HelpModule { }
