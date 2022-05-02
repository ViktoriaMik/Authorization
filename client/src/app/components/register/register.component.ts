import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AppConfigService} from "../../services/app-config.service";
import {ModalService} from "../../services/modal.service";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    user: object = {}
    userModel = {
        access_token: '',
        refresh_token: '',
        user: {
            name: '',
            email: '',
        }
    }

    customValidator(control: AbstractControl): null | object {
        return null
    }

    constructor(private authService: AuthService, private appConfig: AppConfigService, private modalService:ModalService) {
        this.registerForm = new FormGroup({
            name: new FormControl('', [this.customValidator]),
            email: new FormControl('', [this.customValidator]),
            password: new FormControl('', [this.customValidator])
        })
    }

    ngOnInit(): void {

    }


    register() {
        const data = this.registerForm.value
        this.authService.registration(data).subscribe((res) => {
                this.appConfig.userSubject.next(res);
                this.user = res;
                localStorage.setItem('user', JSON.stringify(res))
                this.appConfig.saveAccessToken(this.user)
            this.modalService.loginHeaderModal.next(0);
            }
        )
    }
}
