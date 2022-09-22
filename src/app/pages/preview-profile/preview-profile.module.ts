import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

import { ComponentsModule } from '@components/components.module';

import { PreviewProfilePageRoutingModule } from './preview-profile-routing.module';
import { PreviewProfilePage } from './preview-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FontAwesomeModule,
    PreviewProfilePageRoutingModule
  ],
  declarations: [PreviewProfilePage]
})
export class PreviewProfilePageModule {}
