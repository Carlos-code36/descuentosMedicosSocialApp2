import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppoinmentsHistoryPageRoutingModule } from './appoinments-history-routing.module';
import { ComponentsModule } from '@components/components.module';
import { AppoinmentsHistoryPage } from './appoinments-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FontAwesomeModule,
    AppoinmentsHistoryPageRoutingModule
  ],
  declarations: [AppoinmentsHistoryPage]
})
export class AppoinmentsHistoryPageModule {}
