import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {AppConfigService} from "./services";
import {UserService} from "./services/user.service";
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'client';
    lang = this.appConfig.lang.value;

    constructor(private primengConfig: PrimeNGConfig, private appConfig: AppConfigService,
                private userService: UserService, private translateService: TranslateService
    ) {
    }

    ngOnInit() {
        this.translateService.setDefaultLang(this.lang);
        this.appConfig.lang.subscribe(value => {
            this.lang = value
            this.translateService.setDefaultLang(value)
        })
        this.primengConfig.ripple = true;

    }
}
