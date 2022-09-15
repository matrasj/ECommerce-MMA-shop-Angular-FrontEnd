import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HelpSearchingModalService} from "./service/help-searching-modal-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ECommerceFrontEnd';

  constructor(private helpSearchingModalService : HelpSearchingModalService) {
  }
  ngOnInit(): void {
  }

  onClosingSearching(event : Event | any) {
    if (event.target.closest('.search-results-con') === null
    && event.target.id !== 'search-input') {
      this.helpSearchingModalService.closeModal();
    }
  }


}
