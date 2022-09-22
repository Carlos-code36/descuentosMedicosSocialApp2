import { PipesModule } from './../../pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPublicationsPageRoutingModule } from './search-publications-routing.module';

import { SearchPublicationsPage } from './search-publications.page';
import { ComponentsModule } from '@app/components/components.module';

@NgModule({
  imports: [
    PipesModule,
    FormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
    FontAwesomeModule,
    SearchPublicationsPageRoutingModule
  ],
  declarations: [SearchPublicationsPage]
})
export class SearchPublicationsPageModule {}
