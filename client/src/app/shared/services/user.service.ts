import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {IUser} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from './app-config.service';
import {urls} from '../constants/urls';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpService: HttpClient, private appConfig: AppConfigService) {
    }

    setUser(user: IUser) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): Observable<IUser> {
        return this.httpService.get<IUser>(urls.getUser).pipe(
            tap((res) => {
                this.appConfig.userSubject.next(res);
            })
        );
    }


}
