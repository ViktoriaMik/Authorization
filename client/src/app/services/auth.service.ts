import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {urls} from "../constants/urls";
import {JsonPipe} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpService: HttpClient) {
    }

    login(data: object) {
        return this.httpService.post(urls.login, data);
    }

    logout() {
        let access_token = (localStorage.getItem('access-token'))
        console.log(access_token);
        return this.httpService.post(urls.logout, '', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            })
        });
    }

    registration(data: object) {
        return this.httpService.post(urls.registration, data);
    }
}
