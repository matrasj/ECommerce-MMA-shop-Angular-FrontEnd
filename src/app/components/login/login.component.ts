import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth-service";
import {LoginRequestPayload} from "../../model/login-request-payload";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup : FormGroup | any;
  isAuthenticated : boolean = false;
  constructor(private authService : AuthService,
              private formBuilder : FormBuilder,
              private router : Router,
              private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      loginGroup : this.formBuilder.group({
        username : new FormControl('', [Validators.required, Validators.minLength(2)]),
        password : new FormControl('', [Validators.required, Validators.minLength(2)])
      })
    })
  }

  get username() {
    return this.loginFormGroup.get('loginGroup').get('username');
  }

  get password() {
    return this.loginFormGroup.get('loginGroup').get('password');
  }

  onLoggingFormSubmitting() {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
    } else {
      this.authService.login(
        new LoginRequestPayload(
          this.username.value,
          this.password.value
        )
      );

      this.router.navigate(['']);
    }
  }

}
