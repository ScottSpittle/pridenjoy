import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDividerModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatRippleModule,
  MatSidenavModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountBookingsComponent } from './account-bookings/account-bookings.component';
import { AccountActiveBookingsComponent } from './account-active-bookings/account-active-bookings.component';
import { AccountPreviousBookingsComponent } from './account-previous-bookings/account-previous-bookings.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    AccountRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatDividerModule
  ],
  declarations: [AccountComponent, AccountDetailsComponent, AccountBookingsComponent, AccountActiveBookingsComponent, AccountPreviousBookingsComponent]
})
export class AccountModule { }
