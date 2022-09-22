import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPetPage } from './edit-pet.page';

const routes: Routes = [
  {
    path: '',
    component: EditPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPetPageRoutingModule {}
