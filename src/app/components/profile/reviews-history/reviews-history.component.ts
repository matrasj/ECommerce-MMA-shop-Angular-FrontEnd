import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../../../service/review-service";
import {ReviewPayloadResponse} from "../../../model/review-payload-response";
import {DateFormatService} from "../../../service/date-format-service";

@Component({
  selector: 'app-reviews-history',
  templateUrl: './reviews-history.component.html',
  styleUrls: ['./reviews-history.component.css']
})
export class ReviewsHistoryComponent implements OnInit {
  reviews : ReviewPayloadResponse[]  = [];
  constructor(private reviewService : ReviewService,
              private dateFormatService : DateFormatService) { }

  ngOnInit(): void {
    this.reviewService.getReviewsForCurrentUser()
      .subscribe((reviews) => this.reviews = reviews);
  }

  getFormattedDate(date : string) : string {
    return this.dateFormatService.getDateWithMonthString(date);
  }

}
