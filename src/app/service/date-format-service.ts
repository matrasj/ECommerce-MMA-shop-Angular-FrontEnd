import {Injectable} from "@angular/core";

@Injectable({
  providedIn : 'root'
})
export class DateFormatService {
  constructor() {
  }

  getDateWithMonthString(dateString : string) : string {
    const date : Date =  new Date(dateString);

    const month = date.toLocaleString('default', { month: 'long' });

    return `${date.getDate()} ${month} ${date.getFullYear()}`;
  }
}
