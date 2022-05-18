import {Component, OnInit} from '@angular/core';
import {AppConfigService} from "../../services";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private appConfig: AppConfigService) {
    }

    ngOnInit(): void {
        this.appConfig.userSubject.subscribe(value => {
        })

    }

}
