import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsAppointmentsPage } from './pets-appointments.page';

const routes: Routes = [
  {
    path: '',
    component: PetsAppointmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsAppointmentsPageRoutingModule {}
