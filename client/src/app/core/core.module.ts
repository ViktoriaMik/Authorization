import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingLayoutComponent} from './layouts/landing-layout/landing-layout.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        LandingLayoutComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        NgSelectModule,
        SharedModule,
        ReactiveFormsModule
    ],

})
export class CoreModule {
}
