import { PipesModule } from '@app/pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '@components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiariesPageRoutingModule } from './beneficiaries-routing.module';

import { BeneficiariesPage } from './beneficiaries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    FontAwesomeModule,
    BeneficiariesPageRoutingModule
  ],
  declarations: [BeneficiariesPage]
})
export class BeneficiariesPageModule {}
