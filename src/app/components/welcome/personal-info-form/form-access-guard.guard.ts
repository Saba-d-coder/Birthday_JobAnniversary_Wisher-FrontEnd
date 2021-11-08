import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class FormAccessGuard implements CanActivate {
  currentUser: any;
  loggedIn: any;

  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userService.updateCurrentUser();

    if (
      this.userService.loginStatus?.isLoggedIn &&
      this.userService.currentUser?.user['hireDate'] == null
    )
      return true;
    else if (this.userService.loginStatus?.isLoggedIn) {
      alert('Unauthorised!');
      return this.router.parseUrl('/dashboard');
    } else {
      alert('Unauthorised!');
      return this.router.parseUrl('/welcome');
    }
  }
}
