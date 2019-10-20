import { Component, OnInit} from "@angular/core";
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    title: string;
    form: FormGroup;

    constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
        this.title = "User Login";
        // initialize the form
        this.createForm();
    }

    ngOnInit() {

    }

    createForm() {
        this.form = this.fb.group({
            Username: ['', Validators.required],
            Password: ['', Validators.required]
        });
    }

    onSubmit() {
        var username = this.form.value.Username;
        var password = this.form.value.Password;

        this.authService.login(username, password).subscribe(res => {
            // login successful
            // outputs the login info through a JS alert.
            // IMPORTANT: remove this when test is done.
            alert("Login successful! " + "USERNAME: " + username + " TOKEN: " + this.authService.getAuth()!.token);
            this.router.navigate(["home"]);
        }, err => {
            this.form.setErrors({ "auth": "Incorrect username or password" });
        });
    }

    onBack() {
        this.router.navigate(["home"]);
    }

    getFormControl(name: string) {
        return this.form.get(name);
    }

    isValid(name: string) {
        var e = this.getFormControl(name);
        return e && e.valid;
    }

    isChanged(name: string) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && !e.valid;
    }
}

