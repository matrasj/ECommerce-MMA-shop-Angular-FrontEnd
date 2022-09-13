import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CountryModel} from "../model/country-model";
import {Observable} from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class CountryService {
  private API_COUNTRIES_URL: string = "http://localhost:8081/api/v1/countries";
  constructor(private httpClient : HttpClient) {
  }

  public getCountriesList() : Observable<CountryModel[]> {
    return this.httpClient.get<CountryModel[]>(`${this.API_COUNTRIES_URL}`);
  }
}
