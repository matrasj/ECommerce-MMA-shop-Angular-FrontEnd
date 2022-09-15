export class OrderModel {
  constructor(public id : number,
              public orderTrackingNumber : string,
              public status : string,
              public totalQuantity : number,
              public totalPrice : number,
              public createdAt : string
              ) {
  }
}
