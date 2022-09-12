import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductCategoryModel} from "../model/product-category-model";

@Injectable({
  providedIn : 'root'
})
export class ProductCategoryService {
  private API_PRODUCT_CATEGORIES_URL: string = "http://localhost:8081/api/v1/product-categories";
    constructor(private httpClient : HttpClient) {
    }

    public getAllProductCategories() : Observable<ProductCategoryModel[]> {
      return this.httpClient.get<ProductCategoryModel[]>(`${this.API_PRODUCT_CATEGORIES_URL}`);
    }
}
