import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {IResponce, IUser} from "../interfaces";
import {urls} from "../constants/urls";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {AppConfigService} from "./app-config.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpService: HttpClient, private appConfig: AppConfigService) {
    }

    setUser(user: IUser) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    getUser(): Observable<IUser> {
        return this.httpService.get<IUser>(urls.getUser).pipe(
            tap((user) => {
                this.appConfig.userSubject.next(user)
            })
        )
    }


}
