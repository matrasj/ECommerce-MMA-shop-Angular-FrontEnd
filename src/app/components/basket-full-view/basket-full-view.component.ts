import { Component, OnInit } from '@angular/core';
import {BasketService} from "../../service/basket-service";
import {BasketProductModel} from "../../model/basket-product-model";

@Component({
  selector: 'app-basket-full-view',
  templateUrl: './basket-full-view.component.html',
  styleUrls: ['./basket-full-view.component.css']
})
export class BasketFullViewComponent implements OnInit {
  totalPrice : number = 0;
  totalQuantity : number = 0;
  basket : BasketProductModel[] = [];
  constructor(private basketService : BasketService) { }

  ngOnInit(): void {
    this.basketService.totalPrice
      .subscribe((totalPrice) => this.totalPrice = totalPrice);

    this.basketService.totalQuantity
      .subscribe((totalQuantity) => this.totalQuantity = totalQuantity);

    this.basket = this.basketService.basket;
  }

  decrementQuantity(product : BasketProductModel) {
    if (product.chosenQuantity > 1) {
      product.chosenQuantity--;
      this.basketService.computeBasket();
    }
  }

  incrementQuantity(product : BasketProductModel) {
    if (product.chosenQuantity < product.availableQuantity) {
      product.chosenQuantity++;
      this.basketService.computeBasket();
    }
  }

  removeProductFromBasket(product : BasketProductModel) {
    this.basketService.deleteProductFromTheBasket(product);
  }

}
