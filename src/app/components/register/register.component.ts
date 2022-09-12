import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../service/auth-service";
import {RegistrationRequestModel} from "../../model/registration-request-model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup : FormGroup | any;
  constructor(private formBuilder : FormBuilder,
              private toastrService : ToastrService,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      account : this.formBuilder.group({
        username : new FormControl('', [Validators.required, Validators.minLength(3)]),
        password : new FormControl('', [Validators.required, Validators.minLength(3)]),
        email : new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      })
    })
  }

  get username() {
    return this.registerFormGroup.get('account').get('username');
  }

  get password() {
    return this.registerFormGroup.get('account').get('password');
  }

  get email() {
    return this.registerFormGroup.get('account').get('email');
  }

  onSigningUp() {
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
    } else {
      this.authService.registerUser(new RegistrationRequestModel(
        this.username.value,
        this.password.value,
        this.email.value
      )).subscribe((res) => {
        this.toastrService.success("Check your email account to confirm", "Success");
        this.registerFormGroup.reset();
      });
    }
  }
}
