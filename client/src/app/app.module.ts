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
import {HttpClientModule} from "@angular/common/http";



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
    providers: [ModalService],
    exports: [
        HeaderModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
