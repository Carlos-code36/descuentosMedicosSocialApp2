import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  if (window) {
    window.console.log =
      window.console.warn =
      window.console.info =
      window.console.debug =
      window.console.dir =
      window.console.assert =
      window.console.count =
      window.console.error =
      window.console.group =
      window.console.groupEnd =
      window.console.table =
      window.console.time =
      window.console.timeEnd =
      window.console.timeStamp =
      () => { };
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
