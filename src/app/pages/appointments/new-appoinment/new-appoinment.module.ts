import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { NewAppoinmentPageRoutingModule } from './new-appoinment-routing.module';
import { NewAppoinmentPage } from './new-appoinment.page';

import { CalendarModule } from "ion2-calendar";
import { ComponentsModule } from '@app/components/components.module';
import { PipesModule } from '@app/pipes/pipes.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    PipesModule,
    CalendarModule,
    ComponentsModule,
    FontAwesomeModule,
    NewAppoinmentPageRoutingModule
  ],
  declarations: [NewAppoinmentPage]
})
export class NewAppoinmentPageModule { }
