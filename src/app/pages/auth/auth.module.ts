import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { AditionalDataPageModule } from './aditional-data/aditional-data.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    FontAwesomeModule,
    AuthPageRoutingModule,
    AditionalDataPageModule,
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
