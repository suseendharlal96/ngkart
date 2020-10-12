import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartModel } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  userId: string;
  cartItems: Array<CartModel>;
  actualCartItems: Array<CartModel>;
  loading: boolean;
  total: number;
  payLoading: boolean;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getAuthData()
      ? this.authService.getAuthData().result._id
      : '';
    this.getCart();
  }

  getCart(): void {
    this.loading = true;
    this.total = 0;
    this.cartService.getCart(this.userId).subscribe(
      (res) => {
        this.loading = false;
        this.cartItems = new Array<CartModel>();
        res.cart.forEach((cartItem) => {
          this.cartItems.push(cartItem);
        });
        this.actualCartItems = [...this.cartItems];
        let total = 0;
        this.actualCartItems.forEach((item) => {
          total += item.price * item.quantity;
        });
        this.total = total;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  trackCart(cart: CartModel): string {
    return cart.id;
  }

  changeQuantity(i: number, option: string): void {
    const a = { ...this.actualCartItems[i] };
    if (option === 'decrease') {
      a.quantity--;
    } else {
      a.quantity++;
    }
    a.price = this.cartItems[i].price * a.quantity;
    this.actualCartItems[i] = a;
    let total = 0;
    this.actualCartItems.map((item, index) => {
      if (index === i) {
        total += item.price;
      } else {
        total += item.price * item.quantity;
      }
    });
    this.total = total;
  }

  removeCart(id: number): void {
    this.cartService.removeFromCart(id).subscribe(
      (res) => {
        this.getCart();
      },
      (err) => {}
    );
  }

  pay(cart: CartModel): void {
    this.payLoading = true;
    this.cartService.pay(cart).subscribe(
      (res) => {
        this.payLoading = false;
        window.alert('payment received');
        this.getCart();
      },
      (err) => {
        this.payLoading = false;
      }
    );
  }
}
