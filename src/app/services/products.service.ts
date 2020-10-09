import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(activePage: number, currentLimit: number): Observable<any> {
    return this.http.get(`products?page=${activePage}&limit=${currentLimit}`);
  }

  createProduct(form: ProductModel): Observable<any> {
    return this.http.post(`products`, form);
  }

  updateProduct({ id }, form: ProductModel): Observable<any> {
    console.log(id);
    const updateForm = {
      name: form.name,
      price: form.price,
      imageurl: form.image,
      description: form.description,
    };
    return this.http.patch(`products/${id}`, updateForm);
  }

  deleteProduct(delId: string): Observable<any> {
    return this.http.delete(`products/${delId}`);
  }

  addToCart(body: ProductModel): Observable<any> {
    return this.http.post(`user/cart`, body);
  }
}
