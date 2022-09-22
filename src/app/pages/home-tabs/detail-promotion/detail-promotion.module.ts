import { ComponentsModule } from './../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from './../../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPromotionPageRoutingModule } from './detail-promotion-routing.module';

import { DetailPromotionPage } from './detail-promotion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    FontAwesomeModule,
    DetailPromotionPageRoutingModule
  ],
  declarations: [DetailPromotionPage]
})
export class DetailPromotionPageModule {}
