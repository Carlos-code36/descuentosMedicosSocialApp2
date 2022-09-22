import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullScreenSlidePage } from './full-screen-slide.page';

const routes: Routes = [
  {
    path: '',
    component: FullScreenSlidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullScreenSlidePageRoutingModule {}
