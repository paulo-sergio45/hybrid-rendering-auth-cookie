import { TestBed } from '@angular/core/testing';
import { CookieService } from './cookie.service';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

describe('CookieService', () => {
  let service: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxCookieService],
    });
    service = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
