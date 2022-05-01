import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;


    customValidator(control: AbstractControl): null | object {
        return null
    }

    constructor(private authService: AuthService) {
        this.registerForm = new FormGroup({
            name: new FormControl('', [this.customValidator]),
            email: new FormControl('', [this.customValidator]),
            password: new FormControl('', [this.customValidator])
        })
    }

    ngOnInit(): void {
    }


    register() {
        const data = this.registerForm.value
        this.authService.registration(data).subscribe((res) => console.log(res))
    }
}
