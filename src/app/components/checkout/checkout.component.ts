import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CountryService} from "../../service/country-service";
import {CountryModel} from "../../model/country-model";
import {StateModel} from "../../model/state-model";
import {StateService} from "../../service/state-service";
import {PurchaseService} from "../../service/purchase-service";
import {PurchaseResponse} from "../../model/purchase/purchase-response";
import {AddressPayload} from "../../model/purchase/address-payload";
import {CustomerPayload} from "../../model/purchase/customer-payload";
import {OrderItemPayload} from "../../model/purchase/order-item-payload";
import {BasketService} from "../../service/basket-service";
import {numbers} from "@material/dialog";
import {BasketProductModel} from "../../model/basket-product-model";
import {OrderPayload} from "../../model/purchase/order-payload";
import {PurchasePayload} from "../../model/purchase/purchase-payload";
import {environment} from "../../../environments/environment";
import {PaymentInfoModel} from "../../model/payment-info-model";
import {AuthService} from "../../service/auth-service";
import {UserService} from "../../service/user-service";
import {UserModel} from "../../model/user-model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  countries : CountryModel[] = [];
  states : StateModel[] = [];
  totalQuantity : number = 0;
  totalPrice : number = 0;
  checkoutFormGroup : FormGroup | any;
  cardElement : any;
  displayError : any = '';
  isAuthenticated : boolean = false;
  stripe = Stripe(environment.stripePublishableKey);
  currentUser : UserModel | any;

  constructor(private formBuilder : FormBuilder,
              private countryService : CountryService,
              private stateService : StateService,
              public basketService : BasketService,
              private purchaseService : PurchaseService,
              private authService : AuthService,
              private userService : UserService) { }

  ngOnInit(): void {
    this.setUpStripePaymentForm();

    this.basketService.totalQuantity
      .subscribe((totalQuantity) => this.totalQuantity = totalQuantity);

    this.basketService.totalPrice
      .subscribe((totalPrice) => this.totalPrice = totalPrice);

    this.checkoutFormGroup = this.formBuilder.group({
      purchase : this.formBuilder.group({
        email : new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        firstName : new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]),
        lastName : new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]),
        address : new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        city : new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]),
        country : new FormControl('', [
          Validators.required
        ]),
        state : new FormControl('', [
          Validators.required
        ]),
        zipCode : new FormControl('', [
          Validators.required
        ]),
        phoneNumber : new FormControl('', [
          Validators.required,
          Validators.pattern("^\\d{9}$")
        ]),

        creditCard : this.formBuilder.group({})

      })
    });

    this.authService.loggedIn
      .subscribe((isAuthenticated : boolean) => {
        this.isAuthenticated = isAuthenticated;

        if (this.isAuthenticated) {
          this.userService.getUserData()
            .subscribe((currentUser) => {
              this.currentUser = currentUser;
              this.setUpFormDataWithAuthenticatedUser();
            });
        }
      })

    this.countryService.getCountriesList()
      .subscribe((countries) => {
        this.countries = countries;
        this.country.setValue(this.countries[0].name)
        this.fetchStatesByCountry(this.countries[0].name);
      });
  }

  private getCountryCodeByCountryName(countryName : string) : any {
    // @ts-ignore
    return this.countries.find(((country) => country.name === countryName)).code;
  }

  get email() {
    return this.checkoutFormGroup.get('purchase').get('email');
  }

  get firstName() {
    return this.checkoutFormGroup.get('purchase').get('firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('purchase').get('lastName');
  }

  get address() {
    return this.checkoutFormGroup.get('purchase').get('address');
  }

  get city() {
    return this.checkoutFormGroup.get('purchase').get('city');
  }

  get country() : any {
    return this.checkoutFormGroup.get('purchase').get('country');
  }

  get state() {
    return this.checkoutFormGroup.get('purchase').get('state');
  }

  get zipCode() {
    return this.checkoutFormGroup.get('purchase').get('zipCode');
  }

  get phoneNumber() {
    return this.checkoutFormGroup.get('purchase').get('phoneNumber');
  }

  public fetchStatesByCountry(countryName : string) {
    this.stateService.getStatesByCountry(countryName)
      .subscribe((states) => {
        this.states = states;
        this.state.setValue(this.states[0].name);
      });
  }

  onMakingPurchase() {
    if (this.checkoutFormGroup.invalid || this.displayError.textContent !== '') {
      this.checkoutFormGroup.markAllAsTouched();
    } {
      const basket : BasketProductModel[] = this.basketService.basket;

      const addressPayload : AddressPayload = this.buildAddressPayload();
      const customerPayload : CustomerPayload = this.buildCustomerPayload();
      const orderItemPayloadList : OrderItemPayload[] = this.buildOrderItemPayloadList(basket);
      const orderPayload : OrderPayload = this.buildOrderPayload();

      const purchaseModel : PurchasePayload = new PurchasePayload(
        addressPayload,
        customerPayload,
        orderItemPayloadList,
        orderPayload
      );

      this.purchaseService.createPaymentIntent(new PaymentInfoModel(
        this.totalPrice * 100,
        "PLN"
      )).subscribe((paymentIntentResponse: any) => {
        console.log(paymentIntentResponse)
        this.stripe.confirmCardPayment(JSON.parse(paymentIntentResponse).client_secret, {
          payment_method : {
            card : this.cardElement,
            billing_details : {
              email : `${this.email.value}`,
              name : `${this.firstName.value} ${this.lastName.value}`,
              phone : `${this.phoneNumber.value}`,
              address : {
                line1 : `${this.address.value}`,
                city : `${this.city.value}`,
                state : `${this.state.value}`,
                postal_code : `${this.zipCode.value}`,
                country : `${this.getCountryCodeByCountryName(this.country.value)}`,
              }
            }
          }
        }, {handleActions : false})
          .then((result : any) => {
            if (result.error) {
              alert(`Error ${result.error.message}`);
            } else {
              this.purchaseService.makePurchase(purchaseModel)
                .subscribe((response : PurchaseResponse) => {
                  alert("Order tracking number: " + response.orderTrackingNumber);

                  this.checkoutFormGroup.reset();
                  this.basketService.resetCart();
                  }, error => {
                  alert("Error on backend");
                });
            }
          })
      })

    }
  }

  private buildAddressPayload() : AddressPayload {
    return new AddressPayload(
      this.address.value,
      this.city.value,
      this.country.value,
      this.state.value,
      this.zipCode.value,
    );
  }

  private buildCustomerPayload() : CustomerPayload {
    return new CustomerPayload(
      this.firstName.value,
      this.lastName.value,
      this.phoneNumber.value,
      this.email.value
    );
  }

  private buildOrderItemPayloadList(basket : BasketProductModel[]) {
    return basket
      .map((basketProduct : BasketProductModel) => new OrderItemPayload(
        basketProduct.name,
        basketProduct.size,
        basketProduct.brandName,
        basketProduct.price,
        basketProduct.imagePath,
        basketProduct.chosenQuantity,
        basketProduct.id
      ));
  }

  private buildOrderPayload() : OrderPayload {
    return new OrderPayload(
      this.totalQuantity,
      this.totalPrice
    );
  }

  private setUpStripePaymentForm() {
    var elements = this.stripe.elements();

    this.cardElement = elements.create('card', { hidePostalCode : true});
    this.cardElement.mount('#card-element');
    this.cardElement.on('change', (event : any) => {
        this.displayError = document.getElementById('card-errors');

        if (event.complete) {
          this.displayError.textContent = ''
        } else if (event.error) {
          this.displayError.textContent = event.error.message;
        }

    })
  }

  private setUpFormDataWithAuthenticatedUser() {
    this.firstName.setValue(this.currentUser.firstName);
    this.lastName.setValue(this.currentUser.lastName);
    this.email.setValue(this.currentUser.email);

  }
}
