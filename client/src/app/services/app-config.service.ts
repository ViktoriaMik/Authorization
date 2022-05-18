import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUser} from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    userSubject = new BehaviorSubject<IUser | null>(null);
    actionToken = new BehaviorSubject<string>('');

    constructor() {
    }

}
