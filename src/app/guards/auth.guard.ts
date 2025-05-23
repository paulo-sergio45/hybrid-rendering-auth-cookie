import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const IsAuthenticated=authService.getIsAuthenticated()

  if (IsAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
