import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { LoginModel } from "./../../models/login.model";
import { AuthService } from "./../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: LoginModel = new LoginModel();
    loginForm: FormGroup;
    hidePassword: boolean = true;

    constructor(private router: Router,
        private fb: FormBuilder,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.createLoginForm();
    }

    createLoginForm() {
        this.loginForm = this.fb.group({
            "email": [this.user.email, [
                Validators.required,
                Validators.email]],

            "password": [this.user.password, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)]],
        });
    }

    onLoginSubmit() {
        var username = this.loginForm.value.email;
        var password = this.loginForm.value.password;

        this.authService.login(username, password).subscribe(res => {
            alert("Login successful! ");
            this.router.navigate(["home"]);
        }, err => {
                this.loginForm.setErrors({ "auth": "Incorrect username or password" });
        });
    }
}



