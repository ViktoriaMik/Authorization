import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ModalService {
    modalOpen = new BehaviorSubject(0);
    loginHeaderModal = new BehaviorSubject(0);
    modalRegister = new BehaviorSubject(false);
    forgotPassword = new BehaviorSubject(false);
}
