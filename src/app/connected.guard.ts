import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectedGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const _token = localStorage.getItem('_token') as string;

    if(_token ){
      const jwtPayload = JSON.parse(window.atob( _token.split('.')[1]))
      const isExpired = Date.now() >= jwtPayload.exp * 1000;
      if(!isExpired) return true;
      localStorage.removeItem('_token');
      localStorage.removeItem('user_id');
    }

    window.location.href = '/login';
    return false;
  }
}
