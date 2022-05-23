import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {LoginComponent} from './authorization/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './authorization/register/register.component';
import {AppConfigService, AuthService, ModalService} from "../services";
import {ForgotPasswordComponent} from './authorization/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from "./authorization/reset-password/reset-password.component";
import {TranslateModule} from "@ngx-translate/core";


const routes: Routes = [
    {
        path: 'auth',
        children: [
            {path: 'forgot-password', component: ForgotPasswordComponent},
            {path: 'reset-password', component: ResetPasswordComponent},
        ]
    },

];

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DialogModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    providers: [ModalService, AuthService, AppConfigService],
    exports: [RouterModule, LoginComponent, RegisterComponent,]
})
export class NavigationModule {
}
