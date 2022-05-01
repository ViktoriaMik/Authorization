import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DialogModule} from "primeng/dialog";
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './register/register.component';



const routes: Routes = [
    {
        path: '',
        children: [{path: 'home', component: HomeComponent}, {path: '', component: HomeComponent}]
    },

];

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DialogModule,
        ReactiveFormsModule,


    ],
    exports: [RouterModule, LoginComponent, RegisterComponent,]
})
export class NavigationModule {
}
