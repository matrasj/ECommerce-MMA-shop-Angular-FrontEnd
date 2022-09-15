import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-brand-filters',
  templateUrl: './brand-filters.component.html',
  styleUrls: ['./brand-filters.component.css']
})
export class BrandFiltersComponent implements OnInit {
  brands : string[] = [];
  currentBrand : string = '';
  constructor(private productService : ProductService,
              private router : Router) { }

  ngOnInit(): void {
    this.productService.getAllDistinctBrandNames()
      .subscribe((brands) => this.brands = brands);
  }

  onChanging() {

  }

}
