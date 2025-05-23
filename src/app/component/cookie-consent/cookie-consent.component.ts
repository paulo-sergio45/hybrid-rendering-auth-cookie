import { Component, inject, signal, OnInit } from '@angular/core';
import { CookieService } from '../../service/cookie.service';

@Component({
  selector: 'app-cookie-consent',
  imports: [],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
})
export class CookieConsentComponent {
  protected cookieService = inject(CookieService);
  public consentGiven = signal<boolean>(true);

  constructor() {
    this.consentGiven.set(this.cookieService.checkCookie('cookie_consent'));
  }

  acceptCookies(): void {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    this.cookieService.setCookie('cookie_consent', 'true', expires);
    this.consentGiven.set(true);
  }
}
