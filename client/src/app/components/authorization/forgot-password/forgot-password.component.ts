import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AppConfigService, AuthService} from "../../../services";
import {Router} from "@angular/router";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    forgotPassword: FormGroup

    constructor(private authService: AuthService, private appConfig: AppConfigService, private router:Router) {
        this.forgotPassword = new FormGroup(
            {email: new FormControl('')}
        )
    }

    ngOnInit(): void {
    }

    sendEmail() {
        this.authService.forgotPassword(this.forgotPassword.getRawValue())
            .subscribe(res => {
                this.router.navigate(['auth/reset-password'],{state: {token:res}})
            })
    }
}
