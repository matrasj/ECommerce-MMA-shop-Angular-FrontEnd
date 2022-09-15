import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "../model/product-model";
import {OrderModel} from "../model/order-model";
import {Observable} from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class OrderService {
  private API_ORDERS_URL: string =  "http://localhost:8081/api/v1/orders/current?";
  constructor(private httpClient : HttpClient) {

  }

  public getOrdersByUsername(username : string, pageSize : number, pageNumber : number) : Observable<PageApiResponse> {
    return this.httpClient.get<PageApiResponse>(`${this.API_ORDERS_URL}pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }
}

interface PageApiResponse {
  content : OrderModel[],
  totalElements : number,
  totalPages : number,
  size : number,
  number : number
}
