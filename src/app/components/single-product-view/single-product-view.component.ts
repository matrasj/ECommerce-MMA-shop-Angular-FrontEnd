import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product-service";
import {ActivatedRoute} from "@angular/router";
import {ProductModel} from "../../model/product-model";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../service/auth-service";
import {MatDialog} from "@angular/material/dialog";
import {CreateReviewComponent} from "./create-review/create-review.component";
import {ReviewService} from "../../service/review-service";
import {ReviewPayloadResponse} from "../../model/review-payload-response";
import {DateFormatService} from "../../service/date-format-service";
import {BasketService} from "../../service/basket-service";
import {ToastrService} from "ngx-toastr";
import {BasketLightViewComponent} from "../basket-light-view/basket-light-view.component";

@Component({
  selector: 'app-single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.css']
})
export class SingleProductViewComponent implements OnInit {
  authenticated : boolean = false;
  currentProduct : ProductModel | any;
  chosenQuantity : number = 1;
  reviews : ReviewPayloadResponse[] = [];
  constructor(private productService : ProductService,
              private activatedRoute : ActivatedRoute,
              private authService : AuthService,
              private reviewService : ReviewService,
              private dialogRef : MatDialog,
              private dateFormatService : DateFormatService,
              private basketService : BasketService) { }

  ngOnInit(): void {
    this.authService.loggedIn
      .subscribe((auth : boolean) => this.authenticated = auth);

    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        this.productService.getProductById(Number(paramMap.get('productId')))
          .subscribe((product) => {
            this.currentProduct = product;
            this.reviewService.getReviewsByProductId(this.currentProduct.id)
              .subscribe((reviews) => this.reviews = reviews);
          });
      });

  }

  onReviewCreating() {
    this.dialogRef.open(CreateReviewComponent, {
      data : {
        productId : this.currentProduct.id
      }
    })
  }

  getFormattedDate(date : string) {
    return this.dateFormatService.getDateWithMonthString(date);
  }

  decrementChosenQuantity() {
    if (this.chosenQuantity > 1) {
      this.chosenQuantity--;
    }
  }

  incrementChosenQuantity() {
    if (this.chosenQuantity < this.currentProduct.quantity) {
      this.chosenQuantity++;
    }
  }

  addItemToTheBasket() {
    this.basketService.addItemToTheBasket(
      this.currentProduct,
      this.chosenQuantity
    );

    this.dialogRef.open(BasketLightViewComponent, {
      width : '25%',
      height : '100%',
      position : {
        right : "0%"
      },
      enterAnimationDuration : '0.2s',
    });

    this.chosenQuantity = 1;
  }

}
