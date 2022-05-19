import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {HomeComponent} from './components/home/home.component';
import {HeaderModalComponent} from "./components/modal/header-modal/header-modal.component";
import {NavigationModule} from "./components/navigation.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MainInterceptor} from "./Interceptor/main.interceptor";
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgSelectModule} from "@ng-select/ng-select";

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, './assets/i18n/' +
        '', '.json');
}

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

        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        NgSelectModule


    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: MainInterceptor
        },
    ],
    exports: [
        HeaderModalComponent,
        HeaderComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
