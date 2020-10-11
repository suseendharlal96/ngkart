import { Component, OnInit } from '@angular/core';

import { OrderModel } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  userId: string;
  orders: Array<OrderModel>;
  loading: boolean;
  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.loading = true;
    this.ordersService.getOrders().subscribe(
      (res) => {
        this.orders = new Array<OrderModel>();
        this.loading = false;
        res.orders.forEach((item) => {
          this.orders.push(item.product);
        });
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }
}
