import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../shared/services";

@Injectable({
    providedIn: 'root'
})
export class RoleUserGuard implements CanActivate {
    constructor(private authService:AuthService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isAuthentificted()) {
            return true;
        }
        return false;
    }

}
