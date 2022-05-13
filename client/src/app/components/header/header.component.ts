import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {AuthService, AppConfigService} from "../../services/index";


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

        this.appConfig.userSubject.subscribe(value => {
            this.user = value
            this.userMainInfo = JSON.parse(JSON.stringify(value));
        })
    }

    ngOnInit(): void {
    this.userMainInfo = localStorage.getItem('user')
        this.userMainInfo=JSON.parse(this.userMainInfo)

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
