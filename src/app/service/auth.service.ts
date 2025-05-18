import { Injectable, signal } from '@angular/core';
import { inject } from '@angular/core';
import { first } from 'rxjs';
import { User } from '../model/User';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUserSig = signal<User | undefined | null>(undefined);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  public login(credentials: { email: string; password: string }) {
    return this.apiService
      .post('/login', credentials)
      .pipe(first())
      .subscribe({
        next: (response) => {
          if (response && response.token) {
            this.currentUserSig.set(response.user);
            this.armazenarToken(response.token);
            this.router.navigate(['/home']);
          }
        },
        error: (error) => console.error('Erro no login', error),
      });
  }

  public logout() {
    return this.apiService
      .post('/logout', {})
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('Erro no logout', error);
        },
      });
  }

  public register() {
    return this.apiService
      .post('/register', {})
      .pipe(first())
      .subscribe({
        next: (response) => {},
        error: () => {},
      });
  }

  public isAuthenticated() {
    return this.apiService
      .get('/protected')
      .pipe(first())

  }

  private armazenarToken(token: string): void {
    const expiraEm = new Date();
    expiraEm.setHours(expiraEm.getHours() + 1);

    this.cookieService.set(
      'access_token',
      token,
      expiraEm,
      '/',
      '', // <- aqui você pode colocar seu domínio se quiser restringir
      true, // Secure
      'Strict' // SameSite
    );
  }
}
