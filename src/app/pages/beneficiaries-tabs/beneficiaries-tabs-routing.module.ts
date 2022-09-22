import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiariesTabsPage } from './beneficiaries-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiariesTabsPage,
    children: [
      { path: 'beneficiaries', loadChildren: './beneficiaries/beneficiaries.module#BeneficiariesPageModule' },
      { path: 'pets', loadChildren: './pets/pets.module#PetsPageModule' },
      { path: 'edit-pet/:id_pet', loadChildren: './edit-pet/edit-pet.module#EditPetPageModule' },
      { path: '', redirectTo: '/beneficiaries-tabs/beneficiaries', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    redirectTo: '/beneficiaries',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiariesTabsPageRoutingModule { }
