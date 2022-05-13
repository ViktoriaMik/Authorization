import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import { Router } from '@angular/router';
import {AuthService} from "./services";
import {UserService} from "./services/user.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'client';

    constructor(private primengConfig: PrimeNGConfig, private authService:AuthService, private userService:UserService) {
        userService.getUser().subscribe(res=>console.log(res))
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
