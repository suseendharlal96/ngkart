import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCart(userId): Observable<any> {
    return this.http.get(`user/getCart/${userId}`);
  }

  addToCart(prod: CartModel): Observable<any> {
    const body = {
      _id: prod.id,
      name: prod.name,
      image: prod.image,
      price: prod.price,
      quantity: prod.quantity,
      description: prod.description,
    };
    return this.http.post(`user/cart`, body);
  }

  removeFromCart(productId): Observable<any> {
    return this.http.post('user/removeCartItem', productId);
  }

  pay(product: CartModel): Observable<any> {
    return this.http.post('user/pay', { product });
  }
}
