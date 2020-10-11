import { ProductModel } from './product.model';

export class CartModel extends ProductModel {
  quantity: number;
  constructor(record: any) {
    super(record);
    this.quantity = record.quantity;
  }
}
