import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth-service";

@Injectable({
  providedIn : 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService,
              private router : Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.loggedIn
      .subscribe((authenticated : boolean) => {
        if (authenticated) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }
}
