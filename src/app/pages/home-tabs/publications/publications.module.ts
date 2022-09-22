import { DirectivesModule } from '@app/directives/directives.module';
import { ComponentsModule } from './../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PipesModule } from './../../../pipes/pipes.module';

import { PublicationsPageRoutingModule } from './publications-routing.module';

import { PublicationsPage } from './publications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    DirectivesModule,
    ComponentsModule,
    FontAwesomeModule,
    PublicationsPageRoutingModule
  ],
  declarations: [PublicationsPage]
})
export class PublicationsPageModule {}
