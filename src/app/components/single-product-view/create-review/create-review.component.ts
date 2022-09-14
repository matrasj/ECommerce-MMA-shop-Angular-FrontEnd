import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReviewService} from "../../../service/review-service";
import {ReviewRequestPayload} from "../../../model/review-request-payload";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {
  reviewFormGroup : FormGroup | any;
  currentProductId : number;
  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              private formBuilder : FormBuilder,
              private reviewService : ReviewService,
              private toastrService : ToastrService,
              private dialogRef : MatDialog) {
    this.currentProductId = data.productId;
  }

  ngOnInit(): void {
    this.reviewFormGroup = this.formBuilder.group({
      review : this.formBuilder.group({
        content : new FormControl('', [Validators.minLength(2), Validators.maxLength(200)])
      })
    })
  }

  get content() {
    return this.reviewFormGroup.get('review').get('content');
  }

  onReviewCreating() {
    if (this.reviewFormGroup.invalid) {
      this.reviewFormGroup.markAllAsTouched();
    } else {
      this.reviewService.createReview(new ReviewRequestPayload(
        this.content.value,
        this.currentProductId
      )).subscribe((res) => {
        window.location.reload();
        this.toastrService.success(res);
        this.reviewFormGroup.reset();
        this.dialogRef.closeAll();

      })
    }
  }

}
