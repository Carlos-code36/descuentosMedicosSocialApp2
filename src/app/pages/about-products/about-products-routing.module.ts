import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutProductsPage } from './about-products.page';

const routes: Routes = [
  {
    path: '',
    component: AboutProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutProductsPageRoutingModule {}
