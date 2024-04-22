import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './core/interceptors/cache.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideCharts(withDefaultRegisterables()),
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
};
