import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss'],
})
export class ProductCreationComponent implements OnInit {
  @Output() modalOpen = new EventEmitter<Array<any>>();
  @Input() delProduct: ProductModel;
  @Input() editProduct: ProductModel;

  isModalOpen: boolean;
  loading: boolean;
  isFormSubmitted: boolean;
  form: any;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.form = {
      name: '',
      price: '',
      image: '',
      description: '',
    };
  }

  cancel(): void {
    this.editProduct = null;
    this.modalOpen.emit([false]);
  }

  delConfirm(): void {
    this.loading = true;
    this.productsService.deleteProduct(this.delProduct.id).subscribe(
      (res) => {
        if (res) {
          this.loading = false;
          this.delProduct = null;
          this.modalOpen.emit([false, 'confirmDelete']);
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  submitForm(prodForm: NgForm): void {
    this.isFormSubmitted = true;
    if (prodForm.valid) {
      this.loading = true;
      let url = this.productsService.createProduct(this.form);
      if (this.editProduct) {
        url = this.productsService.updateProduct(
          this.editProduct,
          prodForm.value
        );
      }
      url.subscribe(
        (res) => {
          this.loading = false;
          this.modalOpen.emit([false, 'confirmAdded']);
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }
}
