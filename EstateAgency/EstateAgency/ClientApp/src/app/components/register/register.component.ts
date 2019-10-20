import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { ApiService } from '../../services/api.service';
import { RegisterModel } from "./../../models/register.model";
import { ErrorStateMatcher } from '@angular/material';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    
    user: RegisterModel = new RegisterModel();
    registerForm: FormGroup;
    hidePassword: boolean = true;
    hidePasswordConfirm: boolean = true;

    errorMatcher = new CrossFieldErrorMatcher();

    constructor(private router: Router,
        private fb: FormBuilder,
        private api: ApiService) {
    }

    ngOnInit() {
        this.createRegisterForm();
    }

    createRegisterForm() {
        this.registerForm = this.fb.group({
            "name": [this.user.name, [
                Validators.required]],

            "email": [this.user.email, [
                Validators.required,
                Validators.email]],

            "displayName": [this.user.password, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)]],

            "password": [this.user.password, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)]],

            "passwordConfirm": [this.user.passwordConfirm, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)]],
        }, {
                validator: this.passwordValidator
        })
    }

    onRegisterSubmit() {
        var tempUser = <IUser>{};
        tempUser.username = this.registerForm.value.name;
        tempUser.email = this.registerForm.value.email;
        tempUser.password = this.registerForm.value.password;
        tempUser.displayName = this.registerForm.value.displayName;

        this.api.postRegisterUser(tempUser).subscribe(res => {
            if (res) {
                var v = res;
                console.log("User " + v.username + " has been created.");
                this.router.navigate(["login"]);
            } else {
                this.registerForm.setErrors({ "register": "User registration failed." });
                console.log("nie idało sie hehe");
            }
        }, error => {
            console.log(error);
            
        });
    }

    passwordValidator(form: FormGroup) {
        const condition = form.get('password').value !== form.get('passwordConfirm').value;
        return condition ? { passwordsDoNotMatch: true } : null;
    }
}

class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
        return control.dirty && (form.errors !== null) && form.directives[4].touched;
    }
}
