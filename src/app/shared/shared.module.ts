import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule, MatIconModule, MatListModule, MatRippleModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import { ErrorListComponent } from './error-list/error-list.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatRippleModule,
    MatCardModule,
    MatListModule
  ],
  declarations: [HeaderComponent, FooterComponent, ErrorListComponent],
  exports: [HeaderComponent, FooterComponent, ErrorListComponent]
})
export class SharedModule { }
