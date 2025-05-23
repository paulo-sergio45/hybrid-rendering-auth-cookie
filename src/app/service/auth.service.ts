import { Injectable, Signal, signal } from '@angular/core';
import { inject } from '@angular/core';
import { first } from 'rxjs';
import { User } from '../model/User';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CookieService } from './cookie.service';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  protected apiService = inject(ApiService);
  protected router = inject(Router);
  protected cookieService = inject(CookieService);
  protected cookie = inject(NgxCookieService);

  private currentUserSig = signal<User | undefined | null>(undefined);
  private currentUserToken = signal<string>('');
  private isAuthenticated = signal<boolean>(false);

  public login(credentials: { email: string; password: string }) {
    return this.apiService
      .post(environment.apiPathAuth + '/login', credentials)
      .pipe(first())
      .subscribe({
        next: (response) => {
          if (response && response?.token) {
            this.currentUserSig.set(response.user);
            this.armazenarToken(response.token);
            this.currentUserToken.set(response.token);
            this.isAuthenticated.set(true);
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          console.error('Erro no login', error);
        },
      });
  }

  public logout() {
    this.cookieService.deleteCookie('access_token');
    this.currentUserToken.set('');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  public register() {
    return this.apiService
      .post(environment.apiPathAuth + '/register', {})
      .pipe(first())
      .subscribe({
        next: (response) => {},
        error: () => {},
      });
  }

  public getIsAuthenticated(): Signal<boolean> {
    this.tokenIsValid()
    return this.isAuthenticated.asReadonly();
  }

  public tokenIsValid(): void {
    debugger;
    if (!this.currentUserToken()) {
      const token = this.cookieService.getCookie('access_token');
      if (!token) {
        this.isAuthenticated.set(false);
        return;
      }
      this.currentUserToken.set(token);
    }

    const decodedToken = this.decodeJWTPayload(this.currentUserToken());

    if (!decodedToken || !decodedToken.exp) {
      this.isAuthenticated.set(false);
       return;
    }

    const expirationTime = decodedToken.exp * 1000;
    this.isAuthenticated.set(expirationTime > Date.now());
  }

  public decodeJWTPayload(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  private armazenarToken(token: string): void {
    debugger;
    const decodedToken = this.decodeJWTPayload(token);
    const expires = new Date(decodedToken.exp * 1000);

    this.cookieService.setCookie('access_token', token, expires);

    this.cookie.set(
      'access_token',
      token,
      expires,
      '/',
      '', //  dominio
      true, // Secure
      'Strict' // SameSite
    );
  }
}
