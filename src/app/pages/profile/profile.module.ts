import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ComponentsModule } from '@components/components.module';

import { ProfilePage } from './profile.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from '@app/directives/directives.module';

@NgModule({
  imports: [
    FormsModule,
    PipesModule,
    IonicModule,
    CommonModule,
    DirectivesModule,
    ComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
