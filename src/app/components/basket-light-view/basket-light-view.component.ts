import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BasketService} from "../../service/basket-service";
import {BasketProductModel} from "../../model/basket-product-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basket-light-view',
  templateUrl: './basket-light-view.component.html',
  styleUrls: ['./basket-light-view.component.css']
})
export class BasketLightViewComponent implements OnInit {
  basket : BasketProductModel[] = [];
  totalPrice : number = 0;
  totalQuantity : number = 0;
  constructor(public dialogRef : MatDialog,
              private basketService : BasketService,
              private router : Router) { }

  ngOnInit(): void {
    this.basket = this.basketService.basket;
    this.basketService.totalQuantity
      .subscribe((totalQuantity) => this.totalQuantity = totalQuantity);

    this.basketService.totalPrice
      .subscribe((totalPrice) => this.totalPrice = totalPrice);
  }

  onBasketProductDeleting(product : BasketProductModel) {
    this.basketService.deleteProductFromTheBasket(product);
  }

  onMakingPurchase() {
    this.dialogRef.closeAll();
    this.router.navigateByUrl('/basket');
  }

  navigateToProductSinglePage(product : BasketProductModel) {
    this.router.navigate(['/products', 'view', product.id]);
    this.dialogRef.closeAll();
  }

}
