import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '@components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetsPageRoutingModule } from './pets-routing.module';

import { PetsPage } from './pets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FontAwesomeModule,
    PetsPageRoutingModule
  ],
  declarations: [PetsPage]
})
export class PetsPageModule {}
