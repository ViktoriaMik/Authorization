import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {urls} from "../constants/urls";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpService:HttpClient) {
    }

    login(data:object) {
        return this.httpService.post(urls.login, data);
    }
    registration(data:object) {
        return this.httpService.post(urls.registration, data);
    }
}
