import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUser} from "../interfaces";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    userSubject = new BehaviorSubject<IUser | null>(null);

    constructor() {
    }

}
