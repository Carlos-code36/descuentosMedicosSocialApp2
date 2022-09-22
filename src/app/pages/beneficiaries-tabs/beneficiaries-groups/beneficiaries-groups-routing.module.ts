import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiariesGroupsPage } from './beneficiaries-groups.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiariesGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiariesGroupsPageRoutingModule {}
