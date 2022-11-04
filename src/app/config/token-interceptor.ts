import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../service/auth-service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn : 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService : AuthService,
              private router : Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes("/api/v1/auth")) {
      next.handle(req);
    }

    const jwtToken : string | undefined = this.authService.getJwtToken();
    const authenticatedRequest : HttpRequest<any> = jwtToken ? TokenInterceptor.addTokenToRequest(req, jwtToken) : req;

    return next.handle(authenticatedRequest).pipe(
      catchError(
        err => {
          if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/login']);
          }

          return throwError("Something went wrong");
        }
      )
    )



  }

  private static addTokenToRequest(req : HttpRequest<any>, jwtToken : string) {
    return req.clone({
      setHeaders : {
        "Authorization" : "Bearer " + jwtToken
      }
    })
  }
}
