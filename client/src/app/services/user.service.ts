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

    getUser(): Observable<IResponce> {
        return this.httpService.get<IResponce>(urls.getUser).pipe(
            tap((res) => {
                this.appConfig.userSubject.next(res.user)
            })
        )
    }


}
