import { CanActivateFn } from '@angular/router';

export const routeGuardGuard: CanActivateFn = (route, state) => {
  return true;
};

  // let authService = inject(AuthService)
  // if (authService.getIsAuthenticated()) {
  //   console.log('true: ' + authService.getIsAuthenticated());
  //   return true;
  // }
  // else {
  //   console.log('false: ' + authService.getIsAuthenticated());
  //   return false;
  // }