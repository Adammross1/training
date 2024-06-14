import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    KeycloakService
  ]
};

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://keycloak.lib.byu.edu/',
        realm: 'ces',
        clientId: 'adam-sandbox'
      },
      initOptions: {
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        scope: 'ces access',
        checkLoginIframe: false,
      },
      loadUserProfileAtStartUp: true
    });
}
