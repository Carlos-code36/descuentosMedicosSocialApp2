import { PipesModule } from '@app/pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '@app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullDataProviderPageRoutingModule } from './full-data-provider-routing.module';

import { FullDataProviderPage } from './full-data-provider.page';

@NgModule({
  imports: [
    FullDataProviderPageRoutingModule,
    FontAwesomeModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule
  ],
  declarations: [FullDataProviderPage]
})
export class FullDataProviderPageModule {}
