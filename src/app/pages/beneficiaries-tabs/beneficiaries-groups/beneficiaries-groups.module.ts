import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '@components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiariesGroupsPageRoutingModule } from './beneficiaries-groups-routing.module';

import { BeneficiariesGroupsPage } from './beneficiaries-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FontAwesomeModule,
    BeneficiariesGroupsPageRoutingModule
  ],
  declarations: [BeneficiariesGroupsPage]
})
export class BeneficiariesGroupsPageModule {}
