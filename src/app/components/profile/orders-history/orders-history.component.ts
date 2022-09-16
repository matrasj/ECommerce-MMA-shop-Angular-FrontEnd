import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth-service";
import {OrderModel} from "../../../model/order-model";
import {OrderService} from "../../../service/order-service";
import {ProductModel} from "../../../model/product-model";
import {DateFormatService} from "../../../service/date-format-service";

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {
  orders : OrderModel[] = [];
  pageSize : number = 4;
  pageNumber : number = 1;
  totalElements : number = 0;
  totalPages : number = 0;

  constructor(private authService : AuthService,
              private orderService : OrderService,
              private dateFormatService : DateFormatService) { }

  ngOnInit(): void {
      this.fetchOrders();


  }

  public fetchOrders() {
    this.orderService.getOrdersByUsername(String(this.authService.getUserName()), this.pageSize, this.pageNumber - 1)
      .subscribe((orders) => this.handleResponse(orders));
  }

  getFormattedDate(date : string) {
    return this.dateFormatService.getDateWithMonthString(date);
  }

  private handleResponse(response : any) {
    this.orders = response.content;
    this.pageSize = response.size;
    this.pageNumber = response.number + 1;
    this.totalElements = response.totalElements;
    this.totalPages = response.totalPages;
  }
}
