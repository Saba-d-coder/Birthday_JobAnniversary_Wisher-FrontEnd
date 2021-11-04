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
export class DashboardAccessGuard implements CanActivate {
  loggedIn: any;

  constructor(private userService: UserService, private router: Router) {
    this.loggedIn = JSON.parse(localStorage.getItem('loginStatus') || '{}');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.loggedIn?.isLoggedIn) return true;
    else {
      return this.router.parseUrl('/welcome');
    }
  }
}
