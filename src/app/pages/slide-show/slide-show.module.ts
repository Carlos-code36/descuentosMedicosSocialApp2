import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlideShowPageRoutingModule } from './slide-show-routing.module';

import { SlideShowPage } from './slide-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlideShowPageRoutingModule
  ],
  declarations: [SlideShowPage]
})
export class SlideShowPageModule {}
