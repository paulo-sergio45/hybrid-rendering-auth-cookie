import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { map, catchError, of } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (route.routeConfig?.path === 'login') {
    return authService.isAuthenticated().pipe(
      map(() => {
        router.navigate(['/home']);
        return false;
      }),
      catchError(() => {
        return of(true);
      })
    );
  }

  return authService.isAuthenticated().pipe(
    map(() => {
      return true;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
