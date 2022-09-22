import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
      { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }
    ]
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'aditional-data',
    loadChildren: () => import('./aditional-data/aditional-data.module').then( m => m.AditionalDataPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule { }
