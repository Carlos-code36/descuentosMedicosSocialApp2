import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';

import { FullScreenSlidePageRoutingModule } from './full-screen-slide-routing.module';
import { FullScreenSlidePage } from './full-screen-slide.page';
import { PipesModule } from '@app/pipes/pipes.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    IonicModule,
    PipesModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    FullScreenSlidePageRoutingModule
  ],
  declarations: [FullScreenSlidePage],
  providers: [AndroidFullScreen]
})
export class FullScreenSlidePageModule { }
