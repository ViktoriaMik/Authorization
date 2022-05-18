import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {AppConfigService, AuthService} from "../../services/index";


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
        this.appConfig.userSubject.subscribe(responce => {
            let userInfo: any = ((localStorage.getItem('user')))
            this.user = !responce ? (this.user = (JSON.parse(userInfo))) : responce
        })
    }

    openLogin() {
        this.modalService.loginHeaderModal.next(1);
    }

    logOut() {
        this.userMainInfo = false;
        localStorage.removeItem('user')
        this.appConfig.userSubject.next(null)
        this.authService.logout().subscribe()
    }
}
