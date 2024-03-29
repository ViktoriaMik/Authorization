import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {AppConfigService, ModalService, AuthService} from "../../services";
import {IUser} from "../../interfaces";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    openRegisterModal: boolean = false;
    user = this.appConfig.userSubject.value;

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
        this.authService.login(this.loginForm.getRawValue()).subscribe((res: any) => {
            this.appConfig.userSubject.next(res.user);
        })
        this.modalService.loginHeaderModal.next(0)
    }

    registerModal() {
        this.modalService.modalRegister.next(true);
    }

    forgotPassword() {
        this.modalService.forgotPassword.next(true)
    }
}
