import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {FormGroup} from "@angular/forms";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
        loginUser = true;
    openRegisterModal = false

    constructor(private modalService: ModalService) {
        this.modalService.loginHeaderModal.subscribe((res) => {
            this.loginUser = !!res
        })
        this.modalService.modalRegister.subscribe((res) => {
            this.openRegisterModal = !!res
        })

    }

    ngOnInit(): void {

    }

    openLogin() {
        this.modalService.loginHeaderModal.next(1);

    }
}
