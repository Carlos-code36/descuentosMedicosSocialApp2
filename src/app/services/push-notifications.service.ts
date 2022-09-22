import { OneSignal, OSNotification, OSNotificationOpenedResult, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { UtilitiesService } from './utilities.service';
import { GlobalDataService } from './global-data.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from "@ionic-native/market/ngx";
import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core";

import { Globals } from '@app/globals';
import { Router } from '@angular/router';

const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {
  messages: Array<any> = [];

  constructor(
    private market: Market,
    private _globals: Globals,
    private oneSignal: OneSignal,
    private appVersion: AppVersion,
    private _utilitiesService: UtilitiesService,
    private _globalDataService: GlobalDataService,
    public router: Router,

  ) {
    console.debug(`%c ${String.fromCodePoint(0x1F4EB)} Constructor pushNotifications ready`, 'background: #222; color: #e84393');
  }

  public initialConfiguration(androidPlatform) {
    this.oneSignal.startInit('0a3e4ce8-3e4c-48f6-b323-43a55984e0db', '1000848895766');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe(notification => this.messageReceived(notification));

    this.oneSignal.handleNotificationOpened().subscribe(notification => this.messageOpened(notification));

    this.oneSignal.endInit();

    this.oneSignal.getIds().then(data => {
      this._globals.PUSHNOTIFICATIONSID = data.userId;
    });

    androidPlatform && this.getVersionApp()
  }

  private messageReceived(notification: OSNotification) {
    console.debug('%c \uD83D\uDE00 Push notification received.', 'background: #222; color: #e84393');
    this.addNotification(notification.payload);
  }

  private messageOpened(resolveNotification: OSNotificationOpenedResult) {
    console.debug('%c \uD83D\uDE00 Notification has opened.', 'background: #222; color: #e84393');
    console.log(resolveNotification);
    // TODO
    this.router.navigate([resolveNotification.notification.payload.additionalData.url]);
  }

  private addNotification(payload: OSNotificationPayload) {
    let notifications = this._globals.NOTIFICATIONS;
    let onList = notifications.find(notification => notification.notificationID === payload.notificationID);

    if (onList) return;

    notifications.unshift(payload);
    this._globals.NOTIFICATIONS = notifications;
  }

  private removeNotification(payload: OSNotificationPayload) {
    console.log('Remove data notification', payload);
  }


  // ######################################################### //
  // ###################### Version app ###################### //
  // ######################################################### //

  public getVersionApp() {
    console.log('version app');

    Promise.all([
      this._globalDataService.getVersionAppPlayStore(),
      this.appVersion.getVersionNumber(),
      Device.getInfo()
    ]).then(values => {
      this._globals.VERSIONPLAY = values[0];
      this._globals.VERSIONAPP = values[1];

      !values[2].manufacturer.toLocaleLowerCase().includes('uawei') && this.compareVersion(values[0], values[1])
    })
  }

  compareVersion(version_1, version_2) {
    let needUpdate = false;
    let temp1 = version_1.split('.')
    let temp2 = version_2.split('.')

    if (temp1[0] > temp2[0] && !needUpdate) needUpdate = true;
    if (temp1[1] > temp2[1] && !needUpdate) needUpdate = true;
    if (temp1[2] > temp2[2] && !needUpdate) needUpdate = true;
    
    needUpdate && this._utilitiesService.showInfoDialog(
      'Nueva versión',
      'Tenemos una nueva versión, actualiza yá para no perderte nuestros descuentos y disfruta todos los beneficios que tenemos para tí.'
    ).then(() => this.market.open('com.prevenirdescuentosmedicos.app'))
  }

}
