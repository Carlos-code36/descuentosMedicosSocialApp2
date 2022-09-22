import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPetPageRoutingModule } from './edit-pet-routing.module';

import { EditPetPage } from './edit-pet.page';
import { ComponentsModule } from '@app/components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    PipesModule,
    CommonModule,
    ComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    EditPetPageRoutingModule
  ],
  declarations: [EditPetPage]
})
export class EditPetPageModule {}
