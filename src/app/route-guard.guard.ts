import { CanActivateFn } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { inject } from '@angular/core';

export const routeGuardGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)
  if (authService.getIsAuthenticated()) {
    console.log('true: ' + authService.getIsAuthenticated());
    return true;
  }
  else {
    console.log('false: ' + authService.getIsAuthenticated());
    return false;
  }
};

