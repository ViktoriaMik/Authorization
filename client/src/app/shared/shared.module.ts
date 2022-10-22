import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {AppConfigService, AuthService, ModalService} from './services';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {RegisterComponent} from './components/register/register.component';
import {HeaderModalComponent} from './components/modal/header-modal/header-modal.component';
import {LoginComponent} from './components/login/login.component';

@NgModule({
    declarations: [
        ForgotPasswordComponent,
        RegisterComponent,
        ResetPasswordComponent,
        HeaderModalComponent,
        LoginComponent,
        RegisterComponent

    ],
    exports: [
        HeaderModalComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        DialogModule
    ],
    providers: [ModalService, AuthService, AppConfigService],
})
export class SharedModule {
}
