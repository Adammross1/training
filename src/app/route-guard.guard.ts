import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { inject } from '@angular/core';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

export const routeGuardGuard: CanActivateFn = (route, state) => {
  let authService = inject(KeycloakService)
  if (authService.isLoggedIn()) {
    return true;
  }
  else {
    return inject(Router).createUrlTree(['/'], {relativeTo: null})
  }
}
