import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {HomeComponent} from './components/home/home.component';
import {ModalService} from "./services/modal.service";
import {HeaderModalComponent} from "./components/modal/header-modal/header-modal.component";
import {NavigationModule} from "./components/navigation.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpMainInterceptor} from "./Interceptor/http-main.interceptor";
import {ResInterceptor} from "./Interceptor/res.interceptor";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        HeaderModalComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NoopAnimationsModule,
        DialogModule,
        NavigationModule,
        ReactiveFormsModule,


    ],
    providers: [
         {
            provide: HTTP_INTERCEPTORS,
            multi:true,
            useClass:HttpMainInterceptor
        },
    ],
    exports: [
        HeaderModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
