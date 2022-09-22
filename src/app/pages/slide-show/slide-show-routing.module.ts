import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlideShowPage } from './slide-show.page';

const routes: Routes = [
  {
    path: '',
    component: SlideShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlideShowPageRoutingModule {}
