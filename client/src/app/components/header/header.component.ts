import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {AppConfigService, AuthService} from '../../services/index';
import {FormControl} from '@angular/forms';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    loginUser = true;
    openRegisterModal = false;
    user = this.appConfig.userSubject.value;
    userMainInfo: boolean;
    languageItems = [
        {id: 'de', label: 'DE'},
        {id: 'en', label: 'EN'}
    ];

    language = new FormControl({id: 'en', label: 'EN'});

    constructor(private modalService: ModalService, private appConfig: AppConfigService, private authService: AuthService) {
        this.appConfig.userSubject.subscribe(responce => {
            let userInfo: any = ((localStorage.getItem('user')));
            this.user = !responce ? (this.user = (JSON.parse(userInfo))) : responce;
        });
        this.modalService.loginHeaderModal.subscribe((res) => {
            this.loginUser = !!res;
        });
        this.modalService.modalRegister.subscribe((res) => {
            this.openRegisterModal = !!res;
        });
        this.userMainInfo = !!this.user ? true : false;
    }

    ngOnInit(): void {
        this.language.valueChanges.subscribe(value => {
            this.appConfig.lang.next(value.id);
        });
    }

    openLogin() {
        this.modalService.loginHeaderModal.next(1);
    }

    logOut() {
        this.userMainInfo = false;
        this.appConfig.userSubject.next(null);
        this.authService.logout().subscribe(res => {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
        });
    }
}
