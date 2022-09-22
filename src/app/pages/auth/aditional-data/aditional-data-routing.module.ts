import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AditionalDataPage } from './aditional-data.page';

const routes: Routes = [
  {
    path: '',
    component: AditionalDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AditionalDataPageRoutingModule {}
