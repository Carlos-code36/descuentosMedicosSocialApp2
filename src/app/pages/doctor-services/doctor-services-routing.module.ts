import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorServicesPage } from './doctor-services.page';
import { MyAppointmentsPage } from '../appointments/my-appointments/my-appointments.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorServicesPage,
    children: [
      { path: 'agendadoc', loadChildren: './agenda-doctor/agenda-doctor.module#AgendaDoctorPageModule' },
      { path: 'miappointments', loadChildren: '../appointments/my-appointments/my-appointments.module#MyAppointmentsPageModule' },
      { path: '', redirectTo: '/doctor-services/agendadoc', pathMatch: 'full' }

    ],
  },
  {
    path: '',
    redirectTo: '/doctor-services/agendadoc',
    pathMatch: 'full'

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorServicesPageRoutingModule {}
