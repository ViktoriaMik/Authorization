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
    user = this.appConfig.userSubject.value;

    customValidator(control: AbstractControl): null | object {
        return null
    }

    constructor(private authService: AuthService, private appConfig: AppConfigService, private modalService: ModalService) {
        this.registerForm = new FormGroup({
            name: new FormControl('', [this.customValidator]),
            email: new FormControl('', [this.customValidator]),
            password: new FormControl('', [this.customValidator])
        })
    }

    ngOnInit(): void {
    }

    register() {
        this.authService.registration(this.registerForm.getRawValue()).subscribe((res) => {
                this.modalService.loginHeaderModal.next(0);
            }
        )
    }
}
