export class ProductModel {
  id: string;
  name: string;
  creator: string;
  price: number;
  image: string;
  description: string;
  constructor(record: any) {
    this.id = record._id;
    this.name = record.name;
    this.creator = record.creator;
    this.price = +record.price;
    this.image = record.image;
    this.description = record.description;
  }
}
