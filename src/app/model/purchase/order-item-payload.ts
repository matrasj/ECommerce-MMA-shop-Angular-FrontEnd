export class OrderItemPayload {
  constructor(public name : string,
    public size : string,
    public brandName : string,
    public price : number,
    public imagePath : string,
    public amount : number,
    public productId : number) {
  }
}
