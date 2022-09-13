import {AddressPayload} from "./address-payload";
import {CustomerPayload} from "./customer-payload";
import {OrderItemPayload} from "./order-item-payload";
import {OrderPayload} from "./order-payload";

export class PurchasePayload {
  constructor(public addressPayload : AddressPayload,
              public customerPayload : CustomerPayload,
              public orderItemPayloadList : OrderItemPayload[],
              public orderPayload : OrderPayload) {
  }
}
