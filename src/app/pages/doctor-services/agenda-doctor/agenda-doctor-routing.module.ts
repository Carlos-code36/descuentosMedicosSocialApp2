import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorServicesPage } from './agenda-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorServicesPage
                  
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaDoctorssModule { }
