import { DirectivesModule } from './../../../directives/directives.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    DirectivesModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}