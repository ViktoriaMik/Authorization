import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "../interfaces";
import {urls} from "../constants/urls";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpService: HttpClient) {
    }

    setUser(user: IUser) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    getUser(): Observable<IUser> {
        return this.httpService.get<IUser>(urls.getUser)
    }

    // loadUser() {
    //   if (this.authService.isAuthentificted()) {
    //     try {
    //       this.userService.getUser().subscribe(user => {
    //         this.userSubject.next(user)
    //       })
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   }
    // }
}
