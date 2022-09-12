import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product-service";

@Component({
  selector: 'app-brand-filters',
  templateUrl: './brand-filters.component.html',
  styleUrls: ['./brand-filters.component.css']
})
export class BrandFiltersComponent implements OnInit {
  brands : string[] = [];
  currentBrand : string = '';
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getAllDistinctBrandNames()
      .subscribe((brands) => this.brands = brands);
  }

  onChanging(event : any) {
    document.querySelectorAll('input')
      .forEach((input) => {
        if (input.value !== event.target.value) {
          input.checked = false;
        }
      });

    this.currentBrand = event.target.value;
    console.log(this.currentBrand)
  }

}
