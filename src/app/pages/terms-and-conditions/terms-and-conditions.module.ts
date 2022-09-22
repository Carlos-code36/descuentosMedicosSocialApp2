import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsAndConditionsPageRoutingModule } from './terms-and-conditions-routing.module';

import { TermsAndConditionsPage } from './terms-and-conditions.page';
import { ComponentsModule } from '@app/components/components.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
    TermsAndConditionsPageRoutingModule
  ],
  declarations: [TermsAndConditionsPage]
})
export class TermsAndConditionsPageModule {}
