import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AppConfigService, AuthService, ModalService} from '../../../shared/services';

@Component({
    selector: 'app-landing-layout',
    templateUrl: './landing-layout.component.html',
    styleUrls: ['./landing-layout.component.scss']
})
export class LandingLayoutComponent implements OnInit {
    loginUser = true;
    openRegisterModal = false;
    user = this.appConfig.userSubject.value;
    userMainInfo: boolean;
    languageItems = [
        {id: 'de', label: 'DE'},
        {id: 'en', label: 'EN'}
    ];

    language = new FormControl({id: 'en', label: 'EN'});

    constructor(private modalService: ModalService,
                private appConfig: AppConfigService,
                private authService: AuthService) {
        this.appConfig.userSubject.subscribe((response: any) => {
            let userInfo: any = ((localStorage.getItem('user')));
            this.user = !response ? (this.user = (JSON.parse(userInfo))) : response;
        });
        this.modalService.loginHeaderModal.subscribe((res: any) => {
            this.loginUser = !!res;
        });
        this.modalService.modalRegister.subscribe((res) => {
            this.openRegisterModal = res;
        });
        this.userMainInfo = !!this.user;
    }

    ngOnInit(): void {
        this.language.valueChanges.subscribe((value) => {
            this.appConfig.lang.next(value.id);
        });
    }

    openLogin() {
        this.modalService.loginHeaderModal.next(1);
    }

    logOut() {
        this.userMainInfo = false;
        this.appConfig.userSubject.next(null);
        this.authService.logout().subscribe(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
        });
    }
}
