import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ProductModel } from 'src/app/models/product.model';
import { CartModel } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: ProductModel;
  @Output() isModalOpen = new EventEmitter<Array<any>>();

  creator: string = '';
  token: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getAuthData()
      ? this.authService.getAuthData().token
      : '';
    this.creator = this.authService.getAuthData()
      ? this.authService.getAuthData().result._id
      : '';
  }

  deleteProd(prod: ProductModel): void {
    this.isModalOpen.emit([true, 'delete', prod]);
    this.router.navigate([`delete-product/${prod.id}`]);
  }

  edit(prod: ProductModel): void {
    this.isModalOpen.emit([true, 'edit', prod]);
    this.router.navigate([`edit-product/${prod.id}`]);
  }

  addCart(prod: CartModel): void {
    this.cartService.addToCart(prod).subscribe(
      (res) => {
        if (res && res.msg) {
          window.alert('Added to Cart');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
