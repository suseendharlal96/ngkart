import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ProductModel } from 'src/app/models/product';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss'],
})
export class ProductCreationComponent implements OnInit {
  @Output() modalOpen = new EventEmitter<boolean>();
  @Input() delProduct: ProductModel;
  @Input() editProduct: ProductModel;

  isModalOpen: boolean;
  form: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.isModalOpen);
    this.form = {
      name: '',
      price: 0,
      image: '',
      description: '',
    };
  }

  cancel(): void {
    this.editProduct = null;
    this.modalOpen.emit(false);
  }
}
