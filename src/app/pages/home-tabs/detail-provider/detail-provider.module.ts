import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProviderPageRoutingModule } from './detail-provider-routing.module';

import { DetailProviderPage } from './detail-provider.page';
import { ComponentsModule } from '@app/components/components.module';
import { PipesModule } from '@app/pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    FormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
    FontAwesomeModule,
    DetailProviderPageRoutingModule
  ],
  declarations: [DetailProviderPage]
})
export class DetailProviderPageModule {}
