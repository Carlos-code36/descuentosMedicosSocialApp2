import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromotionsPages } from './promotions.pages';


const routes: Routes = [
  {
    path: '',
    component: PromotionsPages
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotionsPageRoutingModule {}