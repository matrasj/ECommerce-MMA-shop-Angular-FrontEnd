export class ReviewPayloadResponse {
  constructor(public id : number,
              public content : string,
              public createdAt : string,
              public lastUpdated : string,
              public authorFirstName : string,
              public authorLastName : string,
              public authorUsername : string,
              public productId : number,
              public productName : string,
              public productDescription : string,
              public productImagePath : string,
              public productPrice : number,
              public productCategoryName : string) {
  }
}
