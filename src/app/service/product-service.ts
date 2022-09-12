import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductModel} from "../model/product-model";

@Injectable({ providedIn : 'root'})
export class ProductService {
  private API_BRANDS_URL: string = "http://localhost:8081/api/v1/products/brands";
  private API_PRODUCTS_BY_CATEGORY_ID_URL: string = "http://localhost:8081/api/v1/products/pagination/findByProductCategoryId?";
  private API_PRODUCTS_URL: string = "http://localhost:8081/api/v1/products/pagination?";
  private API_SINGLE_PRODUCT_URL: string = "http://localhost:8081/api/v1/products";
  private API_PRODUCTS_KEYWORD_URL : string = "http://localhost:8081/api/v1/products/pagination/findByNameContainingKeyword?"
  constructor(private httpClient : HttpClient) {
  }

  public getAllDistinctBrandNames() : Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.API_BRANDS_URL}`);
  }

  public getProductsWithPaginationByProductCategoryId(productCategoryId : number, pageSize : number, pageNumber : number) : Observable<PageApiResponse> {
    return this.httpClient.get<PageApiResponse>(`${this.API_PRODUCTS_BY_CATEGORY_ID_URL}productCategoryId=${productCategoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public getProductsWithPagination(pageSize : number, pageNumber : number) : Observable<PageApiResponse> {
    return this.httpClient.get<PageApiResponse>(`${this.API_PRODUCTS_URL}pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public getProductById(productId : number) : Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${this.API_SINGLE_PRODUCT_URL}/${productId}`);
  }

  public getProductWithPaginationByKeyword(keyword : string, pageSize : number, pageNumber : number) : Observable<PageApiResponse> {
    return this.httpClient.get<PageApiResponse>(`${this.API_PRODUCTS_KEYWORD_URL}pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}`);
  }
}

interface PageApiResponse {
  content : ProductModel[],
  totalElements : number,
  totalPages : number,
  size : number,
  number : number

}
