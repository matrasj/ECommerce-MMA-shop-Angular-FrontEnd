import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class HelpSearchingModalService {
  isSearchingModalShowing : Subject<boolean> = new BehaviorSubject(false);

  closeModal() {
    this.isSearchingModalShowing.next(false);
  }

  showModal() {
    this.isSearchingModalShowing.next(true);
  }
}
