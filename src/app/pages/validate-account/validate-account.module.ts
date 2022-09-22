import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidateAccountPageRoutingModule } from './validate-account-routing.module';

import { ValidateAccountPage } from './validate-account.page';
import { ComponentsModule } from '@app/components/components.module';
import { PipesModule } from '@app/pipes/pipes.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    PipesModule,
    CommonModule,
    ComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ValidateAccountPageRoutingModule
  ],
  declarations: [ValidateAccountPage]
})
export class ValidateAccountPageModule {}
