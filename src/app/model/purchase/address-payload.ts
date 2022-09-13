export class AddressPayload {
  constructor(
    public address : string,
    public city : string,
    public countryName : string,
    public stateName : string,
    public zipCode : string
  ) {
  }
}
