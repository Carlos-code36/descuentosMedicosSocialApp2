import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewProfilePage } from './preview-profile.page';

const routes: Routes = [
  {
    path: '',
    component: PreviewProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviewProfilePageRoutingModule {}
