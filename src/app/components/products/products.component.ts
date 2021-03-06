import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductModel } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Array<ProductModel>;
  delProduct: ProductModel;
  editProduct: ProductModel;
  totalPages: Array<any>;
  loading: boolean = false;
  isModalOpen: boolean;
  paginationInfo: any;
  activePage: number = 1;
  currentLimit: number = 2;
  token: string;
  constructor(
    private router: Router,
    private productsService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.router.navigate(['/']);
    this.token = this.authService.getAuthData()
      ? this.authService.getAuthData().token
      : '';
  }

  getProducts(): void {
    this.loading = true;
    this.productsService
      .getProducts(this.activePage, this.currentLimit)
      .subscribe(
        (res) => {
          this.loading = false;
          this.paginationInfo = res.paginationInfo;
          this.totalPages = Array.from({
            length: this.paginationInfo.totalPage,
          });
          this.products = new Array<ProductModel>();
          res.products.forEach((prod) => {
            this.products.push(new ProductModel(prod));
          });
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  changeLimit(): void {
    this.getProducts();
  }

  setPage(pageNum: number) {
    this.activePage = pageNum;
    this.getProducts();
  }

  trackProduct(product: ProductModel): string {
    return product.id;
  }

  createProduct(): void {
    this.isModalOpen = true;
    this.editProduct = null;
    this.delProduct = null;
    this.router.navigate(['create-product']);
  }

  setModalContent(value: Array<any>): void {
    if (value.length > 1 && value[1] === 'delete') {
      this.delProduct = value[2];
    }
    if (value.length > 1 && value[1] === 'edit') {
      this.editProduct = value[2];
    }
    if (value.length > 1 && value[1] === 'confirmDelete') {
      this.getProducts();
    }
    if (value.length > 1 && value[1] === 'confirmAdded') {
      this.getProducts();
    }
    this.isModalOpen = value[0];
    if (!value[0]) {
      this.editProduct = null;
      this.delProduct = null;
      this.router.navigate(['/']);
    }
  }
}
