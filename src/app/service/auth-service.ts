import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegistrationRequestModel} from "../model/registration-request-model";
import {BehaviorSubject, Observable, Subject, tap, throwError} from "rxjs";
import {LoginRequestPayload} from "../model/login-request-payload";
import {LoginPayloadResponse} from "../model/login-payload-response";
import {ToastrService} from "ngx-toastr";
import {bottom} from "@popperjs/core";

@Injectable({
  providedIn : 'root'
})
export class AuthService {
  private API_REGISTRATION_URL: string = "http://localhost:8081/api/v1/auth/registration";
  public username : Subject<string> | any= new BehaviorSubject('');
  public loggedIn : Subject<boolean> | any = new BehaviorSubject(false);

  constructor(private httpClient : HttpClient,
              private toastrService : ToastrService) {
    if (localStorage.getItem('username')) {
      this.loggedIn.next(true);
      this.username.next(localStorage.getItem('username'));
    }
  }

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  public registerUser(registrationRequest : RegistrationRequestModel) {
    return this.httpClient.post(`${this.API_REGISTRATION_URL}`, registrationRequest);
  }

  login(loginRequestPayload: LoginRequestPayload) {
    return this.httpClient.post<LoginPayloadResponse>('http://localhost:8081/api/v1/auth/login',
      loginRequestPayload).subscribe((data : LoginPayloadResponse) => {
      localStorage.setItem('authenticationToken', data.authenticationToken);
      localStorage.setItem('username', data.username);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('expiresAt', data.expiresAt);


      this.loggedIn.next(true);
      this.username.next(data.username);
      this.toastrService.success("Successfully logged in!");
      });
  }

  getJwtToken() {
    return localStorage.getItem('authenticationToken');
  }

  refreshToken() {
    return this.httpClient.post<LoginPayloadResponse>('http://localhost:8081/api/v1/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        localStorage.removeItem('authenticationToken');
        localStorage.removeItem('expiresAt');

        localStorage.setItem('authenticationToken',
          response.authenticationToken);
        localStorage.setItem('expiresAt', response.expiresAt);
      }));
  }

  logout() {
    this.httpClient.post('http://localhost:8081/api/v1/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');

    this.loggedIn.next(false);



  }

  getUserName() {
    return localStorage.getItem('username');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }


}
