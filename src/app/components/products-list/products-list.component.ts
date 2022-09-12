import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product-service";
import {ActivatedRoute} from "@angular/router";
import {ProductModel} from "../../model/product-model";
import {BasketService} from "../../service/basket-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products : ProductModel[] = [];
  pageSize : number = 4;
  pageNumber : number = 1;
  totalElements : number = 0;
  totalPages : number = 0;
  constructor(private productService : ProductService,
              private activatedRoute : ActivatedRoute,
              private basketService : BasketService,
              private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.fetchProductsData();
  }

  public fetchProductsData() {
    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        if (paramMap.has('productCategoryId')) {
          this.productService.getProductsWithPaginationByProductCategoryId(Number(paramMap.get('productCategoryId')),
            this.pageSize, this.pageNumber - 1)
            .subscribe((response) => this.handleResponseData(response));
        }

        else if (paramMap.has('keyword')) {
          this.productService.getProductWithPaginationByKeyword(String(paramMap.get('keyword')),
            this.pageSize, this.pageNumber - 1)
            .subscribe((response) => this.handleResponseData(response));
        }

        else {
          this.productService.getProductsWithPagination(this.pageSize, this.pageNumber - 1)
            .subscribe((response) => this.handleResponseData(response));
        }
      })
  }

  private handleResponseData(response : any) {
    this.products = response.content;
    this.pageSize = response.size;
    this.pageNumber = response.number + 1;
    this.totalElements = response.totalElements;
    this.totalPages = response.totalPages;
  }

  addToTheBasket(product : ProductModel) {
    this.basketService.addItemToTheBasket(
      product,
      1
    );

    this.toastrService.info("Added item to your basketm")
  }

}
