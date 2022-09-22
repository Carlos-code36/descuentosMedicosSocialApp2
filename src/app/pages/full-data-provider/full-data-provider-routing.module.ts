import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullDataProviderPage } from './full-data-provider.page';

const routes: Routes = [
  {
    path: '',
    component: FullDataProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullDataProviderPageRoutingModule {}
