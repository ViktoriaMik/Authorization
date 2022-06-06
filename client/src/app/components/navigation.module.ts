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
import {TrelloComponent} from "./trello/trello.component";
import {RoleUserGuard} from "../guards/role-user.guard";


const routes: Routes = [
    {
        path: 'auth',
        children: [
            {path: 'forgot-password', component: ForgotPasswordComponent},
            {path: 'reset-password', component: ResetPasswordComponent},
        ]
    },
    {
        path: 'trello', component: TrelloComponent, canActivate:[RoleUserGuard]
    },

];

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        TrelloComponent,

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
