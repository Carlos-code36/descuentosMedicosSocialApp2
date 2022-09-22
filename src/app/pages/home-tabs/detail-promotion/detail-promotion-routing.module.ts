import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailPromotionPage } from './detail-promotion.page';



const routes: Routes = [
  {
    path: '',
    component: DetailPromotionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPromotionPageRoutingModule {}