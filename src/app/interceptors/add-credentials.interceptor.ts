import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';  

import { Observable } from 'rxjs';

@Injectable()
export class AddCredentialsInterceptor implements HttpInterceptor {

  constructor(private coo:CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      withCredentials: true,
      headers: request.headers.set('Authorization',this.coo.get('email'))
    });
   

    return next.handle(request);
  }
}
