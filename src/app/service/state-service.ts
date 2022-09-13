import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CountryModel} from "../model/country-model";
import {Observable} from "rxjs";
import {StateModel} from "../model/state-model";

@Injectable({
  providedIn : 'root'
})
export class StateService {
  private API_STATES_BY_COUNTRY_URL: string = "http://localhost:8081/api/v1/states/country/";
  constructor(private httpClient : HttpClient) {
  }

  public getStatesByCountry(countryName : string) : Observable<StateModel[]> {
    console.log(countryName)
    return this.httpClient.get<StateModel[]>(`${this.API_STATES_BY_COUNTRY_URL}${countryName}`);
  }
}
