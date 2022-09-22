import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ComponentsModule } from '@components/components.module';
import { BeneficiaryDetailPage } from './beneficiary-detail.page';
import { BeneficiaryDetailPageRoutingModule } from './beneficiary-detail-routing.module';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
    FontAwesomeModule,
    BeneficiaryDetailPageRoutingModule
  ],
  declarations: [BeneficiaryDetailPage]
})
export class BeneficiaryDetailPageModule {}
