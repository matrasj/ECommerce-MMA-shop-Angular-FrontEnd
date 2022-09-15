import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth-service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BasketService} from "../../service/basket-service";
import {MatDialog} from "@angular/material/dialog";
import {BasketLightViewComponent} from "../basket-light-view/basket-light-view.component";
import {ProductModel} from "../../model/product-model";
import {ProductService} from "../../service/product-service";
import {HelpSearchingModalService} from "../../service/help-searching-modal-service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  keywordFormGroup : FormGroup | any;
  isAuthenticated : boolean = false;
  currentUsername : string | any;
  totalPrice : number = 0;
  totalQuantity : number = 0;
  searchedProducts : ProductModel[] = [];
  showResults : boolean = false;
  private searchedLimit: number = 5;
  constructor(private authService : AuthService,
              private router : Router,
              private formBuilder : FormBuilder,
              private basketService : BasketService,
              private dialogRef : MatDialog,
              private productService : ProductService,
              private helpSearchingModalService : HelpSearchingModalService) { }

  ngOnInit(): void {
    this.helpSearchingModalService.isSearchingModalShowing
      .subscribe((isShowing) => this.showResults = isShowing);

    this.basketService.totalPrice
      .subscribe((totalPrice) => this.totalPrice = totalPrice);

    this.basketService.totalQuantity
      .subscribe((totalQuantity) => this.totalQuantity = totalQuantity);

    this.keywordFormGroup = this.formBuilder.group({
      keyword : new FormControl('')
    });
    this.authService.loggedIn
      .subscribe((auth : boolean) => {
        this.isAuthenticated = auth;
      });

    this.authService.username
      .subscribe((username : string) => this.currentUsername = username);
  }

  get keyword() {
    return this.keywordFormGroup.get('keyword');
  }

  logout() {
    this.authService.logout();
    location.reload();
    this.router.navigate(['/']);
  }

  onKeywordSearching() {
    this.helpSearchingModalService.closeModal();
    this.router.navigate(['', 'search', this.keyword.value]);
    this.keywordFormGroup.reset();

  }

  onBasketShowing() {
    this.dialogRef.open(BasketLightViewComponent, {
      width : '25%',
      height : '100%',
      position : {
        right : "0%"
      },
      enterAnimationDuration : '0.2s',
    });
  }

  onLookingForAProducts(event : Event | any) {
    this.helpSearchingModalService.showModal();

    this.productService.getProductsByKeywordSearching(String(event.target.value), this.searchedLimit)
      .subscribe((products) => this.searchedProducts = products);
  }

  navigateToProductView(searchedProduct : ProductModel) {
    this.helpSearchingModalService.closeModal();
    this.router.navigate(['/products', 'view', searchedProduct.id]);
    this.keywordFormGroup.reset();
  }

}
