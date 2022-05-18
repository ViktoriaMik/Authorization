import {Component, OnInit, Input, EventEmitter, Output, OnChanges} from '@angular/core';
import {ModalService} from "../../../services/modal.service";

@Component({
    selector: 'app-header-modal',
    templateUrl: './header-modal.component.html',
    styleUrls: ['./header-modal.component.scss']
})
export class HeaderModalComponent implements OnChanges {
    @Input() displayDialog = false;
    @Input() backgroundColor = '#fff';
    @Input() positionTop = 10;
    @Input() closeDialog = true;
    @Input() dialogWidth = 'unset';
    @Input() currentComponentClass: any;
    @Input() scrollTop = true;
    @Output() onHide = new EventEmitter();

    constructor(private loginHeaderLogin: ModalService) {
    }


    ngOnChanges() {
        if (this.displayDialog && this.scrollTop) {
            document.body.scrollIntoView({block: 'start', behavior: 'smooth'});
            if (this.currentComponentClass) {
                this.currentComponentClass = this.currentComponentClass + ' scroll-to-top-modal-class';
            } else {
                this.currentComponentClass = 'scroll-to-top-modal-class';
            }
        }
    }

    hideDialog() {
        this.onHide.emit();
        this.loginHeaderLogin.loginHeaderModal.next(0);
        this.loginHeaderLogin.modalRegister.next(false);
    }
}
