import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(activePage: number, currentLimit: number): Observable<any> {
    return this.http.get(`products?page=${activePage}&limit=${currentLimit}`);
  }
}
