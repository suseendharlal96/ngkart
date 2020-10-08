import { Component, OnInit } from '@angular/core';

import { ProductModel } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Array<ProductModel>;
  loading: boolean = false;
  paginationInfo: any;
  totalPages: Array<any>;
  constructor(private productsService: ProductsService) {}

  activePage: number = 1;
  currentLimit: number = 2;

  ngOnInit(): void {
    this.getProducts();
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
}
