import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConfigService, AuthService} from '../../services';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetPassword: FormGroup;
    actionToken: string;

    constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
                private appConfig: AppConfigService, private router: Router) {
        this.activatedRoute.params.subscribe(value => {
            this.actionToken = history.state.token;
        });
        this.resetPassword = new FormGroup(
            {password: new FormControl('')}
        );
        this.appConfig.userSubject.subscribe(res => console.log('res subscr'));
    }

    ngOnInit(): void {

    }

    newPassword() {
        this.actionToken && this.authService.resetPassword(this.resetPassword.getRawValue(), this.actionToken)
            .subscribe(res => {
                this.appConfig.userSubject.next(res);
            });
        this.router.navigate(['home']).then(() => {
            window.location.reload();
        });

    }
}
