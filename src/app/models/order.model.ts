import { ProductModel } from './product.model';

export class OrderModel extends ProductModel {
  constructor(record: any) {
    super(record);
  }
}
