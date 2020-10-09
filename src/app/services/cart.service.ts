import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCart(userId): Observable<any> {
    console.log(userId);
    return this.http.get(`user/getCart/${userId}`);
  }
}
