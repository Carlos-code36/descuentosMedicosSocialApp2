import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiariesAppointmentsPage } from './beneficiaries-appointments.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiariesAppointmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiariesAppointmentsPageRoutingModule {}
