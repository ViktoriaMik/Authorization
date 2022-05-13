import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {urls} from "../constants/urls";
import {AppConfigService} from "./app-config.service";
import {Observable} from "rxjs";
import {IResponce} from "../interfaces";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpService: HttpClient, private appConfig: AppConfigService) {
    }

    login(data: object) {
        return this.httpService.post(urls.login, data);

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

    registration(data: object):Observable<IResponce> {
        return this.httpService.post<IResponce>(urls.registration, data);
    }

      getAccessToken() {
        return localStorage.getItem('access_token')
    }

     setAccessToken(token:any): void {
        localStorage.setItem('access_token',token)
    }

    isAuthentificted() {
        return !!this.getAccessToken()
    }


}
