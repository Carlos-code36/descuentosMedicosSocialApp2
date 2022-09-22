import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppoinmentsHistoryPage } from './appoinments-history.page';

const routes: Routes = [
  {
    path: '',
    component: AppoinmentsHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppoinmentsHistoryPageRoutingModule {}
