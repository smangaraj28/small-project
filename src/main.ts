import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import 'hammerjs/hammer';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule).then(
//   (module) => {
//     const applicationRef = module.injector.get(ApplicationRef);
//     const appComponent = applicationRef.components[0];
//     enableDebugTools(appComponent);
//   }
// )
//   .catch(err => console.error(err));
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
