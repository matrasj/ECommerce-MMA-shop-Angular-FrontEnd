import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PurchasePayload} from "../model/purchase/purchase-payload";
import {Observable} from "rxjs";
import {PurchaseResponse} from "../model/purchase/purchase-response";
import {PaymentInfoModel} from "../model/payment-info-model";

@Injectable({
  providedIn : 'root'
})
export class PurchaseService {
  private API_PURCHASE_URL: string = "http://localhost:8081/api/v1/purchase";
  private API_PAYMENT_INTENT_URL : string = "http://localhost:8081/api/v1/purchase/payment-intent"
  constructor(private httpClient : HttpClient) {
  }

  public makePurchase(purchaseModel : PurchasePayload) : Observable<PurchaseResponse> {
    return this.httpClient.post<PurchaseResponse>(`${this.API_PURCHASE_URL}`, purchaseModel);
  }

  public createPaymentIntent(paymentInfo : PaymentInfoModel) : Observable<string> {
    return this.httpClient.post(`${this.API_PAYMENT_INTENT_URL}`, paymentInfo, {
      responseType : 'text'
    });
  }
}
