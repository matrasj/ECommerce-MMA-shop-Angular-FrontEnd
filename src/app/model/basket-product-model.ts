export class BasketProductModel {
  constructor(public id : number,
              public size : string,
              public name : string,
              public description : string,
              public chosenQuantity : number,
              public price : number,
              public brandName : string,
              public imagePath : string,
              public availableQuantity : number,
              public productCategoryName : string
              ) {
  }
}
