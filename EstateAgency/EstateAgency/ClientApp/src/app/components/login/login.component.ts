import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from "./../../models/login.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    user: LoginModel = new LoginModel();

    constructor(private router: Router,
        private fb: FormBuilder,
        private authService: AuthService) {
    }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.router.navigate((['home']));
        }
        this.createForm();
    }

    createForm() {
        this.loginForm = this.fb.group({
            email: [this.user.email, Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$'),
            ])],
            password: [this.user.password, Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ])],

        });
    }

    onSubmit() {
        var email = this.loginForm.value.email;
        var password = this.loginForm.value.password;

        this.authService.login(email, password).subscribe(res => {
            if (res) {
                this.authService.redirectTo ? this.router.navigate(([this.authService.redirectTo])) : this.router.navigate((['']));
                this.authService.redirectTo = "";
            } else {
                this.loginForm.setErrors({ "login": "User login failed." });
            }
                
        }, error => {
                this.loginForm.setErrors({ "login": "User login failed." });
        });
    }

    getFormControl(name: string) {
        return this.loginForm.get(name);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return e.touched && !e.valid;
    }

    routeToRegister() {
        this.router.navigate(['/register']);
    }
}



