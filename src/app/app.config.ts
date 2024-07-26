import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usersFeatureKey, usersReducer } from './core/users/store/reducer';
import { UsersEffects } from './core/users/store/effects';
import { provideEffects } from '@ngrx/effects';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideClientHydration } from '@angular/platform-browser';
import {
  ProductFeatureKey,
  ProductReducer,
} from './core/products/store/reducer';
import { ProductEffect } from './core/products/store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideEffects(UsersEffects, ProductEffect),
    provideState(usersFeatureKey, usersReducer),
    provideState(ProductFeatureKey, ProductReducer),
    provideCharts(withDefaultRegisterables()),
    provideClientHydration(),
  ],
};
