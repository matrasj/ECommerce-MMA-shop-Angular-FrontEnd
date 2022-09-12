export class ReviewPayloadResponse {
  constructor(public id : number,
              public content : string,
              public createdAt : string,
              public lastUpdated : string,
              public authorUsername : string) {
  }
}
