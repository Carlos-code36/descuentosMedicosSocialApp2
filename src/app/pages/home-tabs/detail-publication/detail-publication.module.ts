import { ComponentsModule } from './../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from './../../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPublicationPageRoutingModule } from './detail-publication-routing.module';

import { DetailPublicationPage } from './detail-publication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    FontAwesomeModule,
    DetailPublicationPageRoutingModule
  ],
  declarations: [DetailPublicationPage]
})
export class DetailPublicationPageModule {}
