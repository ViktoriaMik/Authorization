import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppConfigService} from "../../services";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('htmlVideoElement') videoEl: ElementRef;

    constructor(private appConfig: AppConfigService) {
    }

    ngOnInit(): void {
        let streem = navigator.mediaDevices.getUserMedia({video: true}).then((value) => {
            const mediaSource = new MediaSource();
            console.log(mediaSource)
            this.videoEl.nativeElement.src = window.URL.createObjectURL(mediaSource)

            this.videoEl.nativeElement.play();
        })
        this.appConfig.userSubject.subscribe(value => {
        })

    }

}
