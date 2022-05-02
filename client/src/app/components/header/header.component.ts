import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {FormGroup} from "@angular/forms";
import {AppConfigService} from "../../services/app-config.service";
import {AuthService} from "../../services/auth.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    loginUser = true;
    openRegisterModal = false
    user = this.appConfig.userSubject.value;
    userMainInfo: any;
    userData: any;

    constructor(private modalService: ModalService, private appConfig: AppConfigService, private authService: AuthService) {
        this.modalService.loginHeaderModal.subscribe((res) => {
            this.loginUser = !!res
        })
        this.modalService.modalRegister.subscribe((res) => {
            this.openRegisterModal = !!res
        })


    }

    ngOnInit(): void {
        this.appConfig.userSubject.subscribe(value => {
            this.user = value
            this.userMainInfo = JSON.parse(JSON.stringify(value)).user;
        })
        this.userData = localStorage.getItem('user');
        this.userData = JSON.parse(this.userData)
        this.userMainInfo = (this.userData) && this.userData.user

    }

    openLogin() {
        this.modalService.loginHeaderModal.next(1);

    }

    logOut() {
        this.userMainInfo = false;
        localStorage.removeItem('user')
        this.appConfig.userSubject.next('')
        this.authService.logout().subscribe(res=>(console.log(res)))
    }
}
