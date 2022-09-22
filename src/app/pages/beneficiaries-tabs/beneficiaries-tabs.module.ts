import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiariesTabsPageRoutingModule } from './beneficiaries-tabs-routing.module';

import { BeneficiariesTabsPage } from './beneficiaries-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    BeneficiariesTabsPageRoutingModule
  ],
  declarations: [BeneficiariesTabsPage]
})
export class BeneficiariesTabsPageModule {}
