import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthModal } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authData: AuthModal;
  constructor(private http: HttpClient) {}

  authenticate(formData, url): Observable<any> {
    return this.http.post(`user/${url}`, formData);
  }

  setAuthData(data): void {
    this.authData = data;
  }

  getAuthData(): AuthModal {
    return this.authData;
  }
}
