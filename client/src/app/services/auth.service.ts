import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {urls} from "../constants/urls";
import {AppConfigService} from "./app-config.service";
import {Observable, tap} from "rxjs";
import {IRegister, IResponce, IToken} from "../interfaces";
import {ILogin} from "../interfaces/login.interface";
import {UserService} from "./user.service";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpService: HttpClient, private appConfig: AppConfigService, private userService: UserService) {
    }

    login(data: ILogin): Observable<IResponce> {
        return this.httpService.post<IResponce>(urls.login, data)
            .pipe(
                tap(({access_token, user}) => {
                    this.setAccessToken(access_token)
                    this.userService.setUser(user)
                    this.appConfig.userSubject.next(user)
                })
            )
    }

    logout() {
        localStorage.removeItem('user')
        let access_token = this.getAccessToken()
        this.appConfig.userSubject.next(null)
        return this.httpService.post(urls.logout, '', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            })
        });
    }

    registration(data: IRegister): Observable<IResponce> {
        return this.httpService.post<IResponce>(urls.registration, data)
            .pipe(
                tap(({access_token, user}) => {
                    this.setAccessToken(access_token)
                    this.userService.setUser(user)
                    this.appConfig.userSubject.next(user)
                })
            )
    }

    refresh():Observable<IResponce> {
        return this.httpService.get<IResponce>(urls.refresh)
            .pipe(
                tap(({access_token, user}) => {
                    this.setAccessToken(access_token)
                    this.userService.setUser(user)
                    this.appConfig.userSubject.next(user)
                })
            )
    }

    getAccessToken() {
        return localStorage.getItem('access_token')
    }

    setAccessToken(token: string) {
        localStorage.setItem('access_token', token)
    }

    isAuthentificted() {
        return !!this.getAccessToken()
    }


}
