import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { ThemeDetection, ThemeDetectionResponse } from '@ionic-native/theme-detection/ngx';
import { PushNotificationsService } from '@app/services';
import { Globals } from './globals';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  menuList;

  constructor(
    private _pushNotificationsService: PushNotificationsService,
    private themeDetection: ThemeDetection,
    private platform: Platform,
    public _globals: Globals,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('cordova')) {
        this._pushNotificationsService.initialConfiguration(this.platform.is('android'));

        // this.themeDetection.isAvailable().then((res: ThemeDetectionResponse) => {
        //   console.log(res);
        // })
        //   .catch(err => console.log(err))

        // this.themeDetection.isAvailable()
        //   .then((res: ThemeDetectionResponse) => {
        //     if (res.value) {
        //       this.themeDetection.isDarkModeEnabled().then((res: ThemeDetectionResponse) => {
        //         console.log(res);
        //       })
        //         .catch((error: any) => console.error(error));
        //     }
        //   })
        //   .catch((error: any) => console.error(error));
      }

      console.debug(`%c \uD83D\uDE00  ${String.fromCodePoint(0x1F604)} App initialized successfully`, 'background: #222; color: #e84393');
    });
  }
}
