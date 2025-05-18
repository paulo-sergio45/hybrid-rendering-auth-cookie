import { Component, inject, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-consent',
  imports: [],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss'
})
export class CookieConsentComponent {
  private cookieService = inject(CookieService);
  consentGiven = signal(this.cookieService.check('cookie_consent'));

  acceptCookies(): void {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    this.cookieService.set('cookie_consent', 'true', expires, '/', '', true, 'Strict');
    this.consentGiven.set(true);
  }
}
