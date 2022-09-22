import { DirectivesModule } from '@app/directives/directives.module';
import { ComponentsModule } from './../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PipesModule } from './../../../pipes/pipes.module';



import { PromotionsPages } from './promotions.pages';
import { PromotionsPageRoutingModule } from './promotions-routing.module';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      PipesModule,
      DirectivesModule,
      ComponentsModule,
      FontAwesomeModule,
      PromotionsPageRoutingModule
    ],
    declarations: [PromotionsPages]
  })
  export class PromotionsPageModule {}