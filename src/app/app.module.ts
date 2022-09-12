import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import {ProductCategoryService} from "./service/product-category-service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CategoriesFilterComponent } from './components/categories-filter/categories-filter.component';
import {RouterModule} from "@angular/router";
import { ProductsPageViewComponent } from './components/products-page-view/products-page-view.component';
import { BrandFiltersComponent } from './components/brand-filters/brand-filters.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import {NgbDropdown, NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SingleProductViewComponent} from "./components/single-product-view/single-product-view.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import {LoginComponent} from "./components/login/login.component";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./service/auth-service";
import { CreateReviewComponent } from './components/single-product-view/create-review/create-review.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReviewService} from "./service/review-service";
import {TokenInterceptor} from "./token-interceptor";
import {DateFormatService} from "./service/date-format-service";
import {BasketService} from "./service/basket-service";
import { BasketLightViewComponent } from './components/basket-light-view/basket-light-view.component';
import { BasketFullViewComponent } from './components/basket-full-view/basket-full-view.component';


const routes = [
  { path : "", component : ProductsPageViewComponent},
  { path : "search/:keyword", component: ProductsPageViewComponent},
  { path : "products", component: ProductsPageViewComponent},
  { path : "products/category/:productCategoryId", component : ProductsPageViewComponent},
  { path : "products/view/:productId", component: SingleProductViewComponent},
  { path : "register", component: RegisterComponent},
  { path: "login", component: LoginComponent},
  { path : "basket", component: BasketFullViewComponent}
];

export function createTranslateLoader(httpClient : HttpClient) {
  return new TranslateHttpLoader(httpClient)
}
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CategoriesFilterComponent,
    ProductsPageViewComponent,
    BrandFiltersComponent,
    ProductsListComponent,
    SingleProductViewComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    CreateReviewComponent,
    BasketLightViewComponent,
    BasketFullViewComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgbModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    TranslateModule.forRoot({
      loader : {
        provide : TranslateLoader,
        useFactory : (createTranslateLoader),
        deps : [HttpClient],

      },
      defaultLanguage : 'po'
    }),

  ],
  providers: [ProductCategoryService, NgbDropdown, ToastrService, AuthService, ReviewService, DateFormatService, BasketService,
    {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptor, multi : true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
