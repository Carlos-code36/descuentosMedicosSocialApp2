import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';

import { ChangePasswordPage } from './change-password.page';
import { DirectivesModule } from '@app/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectivesModule,
    ComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ChangePasswordPageRoutingModule
  ],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule {}
