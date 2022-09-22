import { ValidationsGuard } from './../../guards/validations.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTabsPage } from './home-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTabsPage,
    children: [
      { path: 'menu', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'publications', loadChildren: './publications/publications.module#PublicationsPageModule' },
      { path: 'promociones', loadChildren: './promotions/promotions.module#PromotionsPageModule' },
      { path: 'profile', loadChildren: '../preview-profile/preview-profile.module#PreviewProfilePageModule', canActivate: [ValidationsGuard] },
      { path: '', redirectTo: '/home/publications', pathMatch: 'full' }
    ]
  },
  { path: 'detail-publication/:id_publication/:id_subservicio/:id_municipio', loadChildren: './detail-publication/detail-publication.module#DetailPublicationPageModule' },
  { path: 'detail-promotion/:id_promocion', loadChildren: './detail-promotion/detail-promotion.module#DetailPromotionPageModule' },
  { path: 'detail-provider/:id_provider/:id_municipio/:id_servicio', loadChildren: './detail-provider/detail-provider.module#DetailProviderPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTabsPageRoutingModule { }