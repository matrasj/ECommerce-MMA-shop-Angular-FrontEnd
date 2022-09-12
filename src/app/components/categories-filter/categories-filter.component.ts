import { Component, OnInit } from '@angular/core';
import {ProductCategoryService} from "../../service/product-category-service";
import {ProductCategoryModel} from "../../model/product-category-model";

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.css']
})
export class CategoriesFilterComponent implements OnInit {
  productCategories : ProductCategoryModel[] = [];
  constructor(private productCategoryService : ProductCategoryService) { }

  ngOnInit(): void {
    this.productCategoryService.getAllProductCategories()
      .subscribe((productCategories) => this.productCategories = productCategories);
  }

}
