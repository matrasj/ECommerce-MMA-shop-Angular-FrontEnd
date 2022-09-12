export class ProductModel {
  constructor(public id : number,
  public size : string,
  public name : string,
  public description : string,
  public quantity : number,
  public price : number,
  public brandName : string,
  public createdAt : string,
  public lastUpdated : string,
  public imagePath : string,
  public productCategoryName : string) {
  }
}
