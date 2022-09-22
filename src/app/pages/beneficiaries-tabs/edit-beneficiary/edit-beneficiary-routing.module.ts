import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBeneficiaryPage } from './edit-beneficiary.page';

const routes: Routes = [
  {
    path: '',
    component: EditBeneficiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBeneficiaryPageRoutingModule {}
