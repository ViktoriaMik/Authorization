import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ModalService} from "../../services/modal.service";
import {AppConfigService} from "../../services/app-config.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    openRegisterModal: boolean = false;
    user: any;

    customValidator(control: AbstractControl): null | object {
        return null
    }

    constructor(private authService: AuthService, private modalService: ModalService, private appConfig: AppConfigService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [this.customValidator]),
            password: new FormControl('', [this.customValidator])
        })
    }

    ngOnInit(): void {
        this.modalService.modalRegister.subscribe((res) => {
            this.openRegisterModal = res;
        })
    }


    login() {
        const data = this.loginForm.value
        this.authService.login(data).subscribe((res: any) => {
            this.appConfig.userSubject.next(res);
            this.user = res;
            localStorage.setItem('user', JSON.stringify(res))
            this.appConfig.saveAccessToken(this.user)
        })
        this.modalService.loginHeaderModal.next(0)
    }

    registerModal() {
        this.modalService.modalRegister.next(true);
    }

    forgotPassword() {

    }
}
