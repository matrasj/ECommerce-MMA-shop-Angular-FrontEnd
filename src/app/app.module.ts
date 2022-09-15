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
import { CheckoutComponent } from './components/checkout/checkout.component';
import {PurchaseService} from "./service/purchase-service";
import {UserService} from "./service/user-service";
import {MatSidenavModule} from "@angular/material/sidenav";
import { ProfileComponent } from './components/profile/profile.component';
import {AuthGuard} from "./service/security/auth-guard";
import { OrdersHistoryComponent } from './components/profile/orders-history/orders-history.component';
import { ReviewsHistoryComponent } from './components/profile/reviews-history/reviews-history.component';
import { AccountDeliveryDataComponent } from './components/profile/account-delivery-data/account-delivery-data.component';
import {OrderModel} from "./model/order-model";
import {OrderService} from "./service/order-service";


const routes = [
  { path : "", component : ProductsPageViewComponent},
  { path : "search/:keyword", component: ProductsPageViewComponent},
  { path : "products", component: ProductsPageViewComponent},
  { path : "profile", component: ProfileComponent, canActivate : [AuthGuard]},
  { path : "profile/orders", component : OrdersHistoryComponent, canActivate : [AuthGuard]},
  { path : "profile/reviews", component: ReviewsHistoryComponent, canActivate : [AuthGuard]},
  { path : "profile/account-delivery-data", component: AccountDeliveryDataComponent, canActivate : [AuthGuard]},
  { path : "products/category/:productCategoryId", component : ProductsPageViewComponent},
  { path : "products/view/:productId", component: SingleProductViewComponent},
  { path : "register", component: RegisterComponent},
  { path: "login", component: LoginComponent},
  { path : "basket", component: BasketFullViewComponent},
  { path : "checkout", component: CheckoutComponent},
  { path : "products/brand/:brandName", component: ProductsPageViewComponent},
  { path : "**", redirectTo : '/'}
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
    BasketFullViewComponent,
    CheckoutComponent,
    ProfileComponent,
    OrdersHistoryComponent,
    ReviewsHistoryComponent,
    AccountDeliveryDataComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
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
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],

      },
      defaultLanguage: 'po'
    }),
    MatSidenavModule,

  ],
  providers: [
    ProductCategoryService,
    NgbDropdown,
    ToastrService,
    AuthService,
    ReviewService,
    DateFormatService,
    BasketService,
    PurchaseService,
    UserService,
    OrderService,
    {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptor, multi : true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
