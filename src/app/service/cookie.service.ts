import { Injectable, inject } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  protected cookie = inject(NgxCookieService);

  constructor() {}

  public getCookie(cookieName: string): string {

    return this.cookie.get(cookieName);
  }

  public checkCookie(cookieName: string): boolean {

    return this.cookie.check(cookieName);
  }

  public setCookie(
    cookieName: string,
    value: string,
    expires: Date,
    path: string = '/',
    domain: string = '',
    secure: boolean = false,
    sameSite: 'Strict' | 'Lax' | 'None' = 'Lax'
  ): void {
    debugger;
    this.cookie.set(cookieName, value, expires, path, domain, secure, sameSite);
  }

  public deleteCookie(cookieName: string, path: string = '/'): void {
    this.cookie.delete(cookieName, path);
  }
}
