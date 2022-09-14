import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/user-model";

@Injectable({
  providedIn : 'root'
})
export class UserService {
  private API_USER_BY_USERNAME_URL: string = " http://localhost:8081/api/v1/users/current";
  constructor(private httpClient : HttpClient) {
  }

  public getUserData() : Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.API_USER_BY_USERNAME_URL}`);
  }
}
