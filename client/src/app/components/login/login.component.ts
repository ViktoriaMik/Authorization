import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ModalService} from "../../services/modal.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    openRegisterModal: boolean = false;

    customValidator(control: AbstractControl): null | object {
        return null
    }

    constructor(private authService: AuthService, private modalService: ModalService) {
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
        this.authService.login(data).subscribe((res: any) => console.log(res))
    }

    registerModal() {
        this.modalService.modalRegister.next(true);
    }

    forgotPassword() {

    }
}
