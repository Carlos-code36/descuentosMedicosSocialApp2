import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentsDoctorPage } from './appointments-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsDoctorPageRoutingModule {}
