import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from "./user.service";
import {AppConfigService} from "./app-config.service";

@Injectable({
    providedIn: 'root'
})
export class UserLoadResolver implements Resolve<any> {
    constructor(private userService: UserService, private appConfig: AppConfigService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): Observable<boolean> {
        this.userService.getUser().subscribe(res => {
            this.appConfig.userSubject.next(res)
            this.userService.setUser(res)
        })
        return of(true);
    }
}
