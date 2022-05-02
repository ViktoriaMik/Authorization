import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    userSubject = new BehaviorSubject({});

    constructor() {
    }

    saveAccessToken(user: any) {
        localStorage.setItem('access-token', (user.access_token))
    }
}
