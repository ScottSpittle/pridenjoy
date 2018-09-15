import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from './account.component';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {AccountBookingsComponent} from './account-bookings/account-bookings.component';
import {AccountActiveBookingsComponent} from './account-active-bookings/account-active-bookings.component';
import {AccountPreviousBookingsComponent} from './account-previous-bookings/account-previous-bookings.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {path: '', redirectTo: 'details', pathMatch: 'full'},
      {path: 'details', component: AccountDetailsComponent},
      {
        path: 'bookings',
        component: AccountBookingsComponent,
        children: [
          { path: '', redirectTo: 'active', pathMatch: 'full' },
          { path: 'active', component: AccountActiveBookingsComponent },
          { path: 'historic', component: AccountPreviousBookingsComponent },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
