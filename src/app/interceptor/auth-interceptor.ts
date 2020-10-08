import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authData = this.auth.getAuthData();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      url: `https://node-shop-cart.herokuapp.com/${req.url}`,
      headers:
        authData && authData.token
          ? req.headers.set('Authorization', `Bearer ${authData.token}`)
          : null,
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
