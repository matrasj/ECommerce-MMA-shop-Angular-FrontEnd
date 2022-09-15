import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ReviewRequestPayload} from "../model/review-request-payload";
import {Observable} from "rxjs";
import {ReviewPayloadResponse} from "../model/review-payload-response";

@Injectable({
  providedIn : "root"
})
export class ReviewService {
  private API_CREATE_REVIEW_URL: string = "http://localhost:8081/api/v1/reviews";
  private API_REVIEWS_BY_PRODUCT_ID_URL: string = "http://localhost:8081/api/v1/reviews/products/id";
  private API_REVIEWS_CURRENT_USER: string = "http://localhost:8081/api/v1/reviews/current";
  constructor(private httpClient : HttpClient) {
  }

  public createReview(reviewPayloadRequest : ReviewRequestPayload) : Observable<string>{
    return this.httpClient.post(`${this.API_CREATE_REVIEW_URL}`, reviewPayloadRequest, {
      responseType : 'text'
    });
  }

  public getReviewsByProductId(productId : number) : Observable<ReviewPayloadResponse[]> {
    return this.httpClient.get<ReviewPayloadResponse[]>(`${this.API_REVIEWS_BY_PRODUCT_ID_URL}/${productId}`);
  }

  public getReviewsForCurrentUser() : Observable<ReviewPayloadResponse[]> {
    return this.httpClient.get<ReviewPayloadResponse[]>(`${this.API_REVIEWS_CURRENT_USER}`);
  }
}
