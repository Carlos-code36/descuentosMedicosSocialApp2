import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentsPage } from './appointments.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsPage,
    children: [
      { path: 'my-appointments', loadChildren: './my-appointments/my-appointments.module#MyAppointmentsPageModule' },
      { path: 'beneficiaries-appointments', loadChildren: './beneficiaries-appointments/beneficiaries-appointments.module#BeneficiariesAppointmentsPageModule' },
      { path: 'pets-appointments', loadChildren: './pets-appointments/pets-appointments.module#PetsAppointmentsPageModule' },
    ]
  },
  { path: 'appoinments-history/:id_member/:type', loadChildren: './appoinments-history/appoinments-history.module#AppoinmentsHistoryPageModule' },
  { path: 'new-appoinment/:data_req/:patient_id/:prev_appointment/:id_subServicio', loadChildren: './new-appoinment/new-appoinment.module#NewAppoinmentPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsPageRoutingModule { }
