import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutProductsPageRoutingModule } from './about-products-routing.module';

import { AboutProductsPage } from './about-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutProductsPageRoutingModule
  ],
  declarations: [AboutProductsPage]
})
export class AboutProductsPageModule {}
