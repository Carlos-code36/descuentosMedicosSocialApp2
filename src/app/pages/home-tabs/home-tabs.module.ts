import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTabsPageRoutingModule } from './home-tabs-routing.module';

import { HomeTabsPage } from './home-tabs.page';
import { DirectivesModule } from '@app/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectivesModule,
    FontAwesomeModule,
    HomeTabsPageRoutingModule
  ],
  declarations: [HomeTabsPage]
})
export class HomeTabsPageModule {}
