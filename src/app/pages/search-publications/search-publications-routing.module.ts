import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPublicationsPage } from './search-publications.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPublicationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPublicationsPageRoutingModule {}
