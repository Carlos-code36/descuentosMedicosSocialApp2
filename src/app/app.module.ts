import { Market } from '@ionic-native/market/ngx';
import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './pipes/pipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { File } from '@ionic-native/file/ngx';
import { HTTP } from "@ionic-native/http/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { Downloader } from "@ionic-native/downloader/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { DocumentViewer } from "@ionic-native/document-viewer/ngx";

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Globals } from './globals';

import localeEs from "@angular/common/locales/es";
import { CommonModule, registerLocaleData } from "@angular/common";

import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';

import { DirectivesModule } from './directives/directives.module';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

import { UserService } from './services/user.service';
import { GlobalDataService } from '@app/services';

import { OneSignal } from '@ionic-native/onesignal/ngx';

import { ThemeDetection } from '@ionic-native/theme-detection/ngx';

import './custom-prototypes';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ComponentsModule } from './components/components.module';

registerLocaleData(localeEs, 'es');

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    DirectivesModule,
    ComponentsModule,
    BrowserModule,
    SharedModule,
    CommonModule,
    PipesModule
  ],
  providers: [
    AndroidFullScreen,
    LocalNotifications,
    ThemeDetection,
    SplashScreen,
    FileTransfer,
    SocialSharing,
    //PDFGenerator,
    UserService,
    InAppBrowser,
    PhotoViewer,
    AppVersion,
    DatePicker,
    StatusBar,
    OneSignal,
    Globals,
    Market,
    Camera,
    Base64,
    HTTP,
    File,
    FileOpener,
    Screenshot,
    Downloader,
    DocumentViewer,
    Crop,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (_globalDataService: GlobalDataService) => () => _globalDataService.syncronizeAllData(),
      deps: [GlobalDataService],
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }
}
