import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverPasswordPageRoutingModule } from './recover-password-routing.module';

import { RecoverPasswordPage } from './recover-password.page';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RecoverPasswordPageRoutingModule
  ],
  declarations: [RecoverPasswordPage]
})
export class RecoverPasswordPageModule {}
