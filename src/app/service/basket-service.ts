import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {BasketProductModel} from "../model/basket-product-model";
import {bottom} from "@popperjs/core";
import {ProductModel} from "../model/product-model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn : 'root'
})
export class BasketService {
  public totalPrice : Subject<number> = new BehaviorSubject(0);
  public totalQuantity : Subject<number> = new BehaviorSubject(0);
  public basket : BasketProductModel[] = [];

  constructor(private router : Router,
              private toastrService : ToastrService) {
    if (localStorage.getItem('basket')) {
      // @ts-ignore
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.computeBasket();
    }
  }

  public computeBasket() : void {
    const totalComputedPrice : number = this.basket
      .map((basketProduct) => basketProduct.chosenQuantity * basketProduct.price)
      .reduce((sum, cur) => sum + cur, 0);

    const totalComputedQuantity : number = this.basket
      .map(((basketProduct) => basketProduct.chosenQuantity))
      .reduce((sum, cur) => sum + cur, 0);

    this.totalPrice.next(totalComputedPrice);
    this.totalQuantity.next(totalComputedQuantity);

    localStorage.setItem('basket', JSON.stringify(this.basket));
  }

  public addItemToTheBasket(product : ProductModel, chosenQuantity : number) : void {
    const existingProduct : BasketProductModel | any
      = this.basket.find((basketProd) => basketProd.id === product.id);
    if (existingProduct) {
      existingProduct.chosenQuantity += chosenQuantity;
    } else {
     this.basket.push(
       new BasketProductModel(
         product.id,
         product.size,
         product.name,
         product.description,
         chosenQuantity,
         product.price,
         product.brandName,
         product.imagePath,
         product.quantity,
         product.productCategoryName
       )
     );
   }

    this.computeBasket();
  }

  deleteProductFromTheBasket(product : BasketProductModel) {
    const productInBasket : ProductModel | any
      = this.basket.find((basketProduct) => basketProduct.id === product.id);

    if (productInBasket) {
      this.basket.splice(this.basket.indexOf(productInBasket), 1);
    }

    this.computeBasket();
  }

  resetCart() {
    this.basket = [];
    this.totalPrice.next(0);
    this.totalQuantity.next(0);
    this.computeBasket();
    this.router.navigate(['/']);
    this.toastrService.success("Successfully made order!")
  }

}
