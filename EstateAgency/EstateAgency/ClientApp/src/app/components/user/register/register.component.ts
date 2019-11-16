import { ApiService } from '../../../services/api.service';
import { RegisterModel } from "./../../../models/register.model";
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    user: RegisterModel = new RegisterModel();

    constructor(private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        private api: ApiService,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.router.navigate((['home']));
        }
        this.createForm();
    }

    createForm() {
        this.registerForm = this.fb.group({
            name: [this.user.name, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)
            ])],

            email: [this.user.email, Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$'),
            ])],

            displayName: [this.user.displayName, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)
            ])],

            phoneNumber: [this.user.phoneNumber, Validators.compose([
                Validators.required,
                Validators.pattern('^[0-9]{1,}$'),
                Validators.maxLength(9),
                Validators.minLength(9),
            ])],

            password: [this.user.password, Validators.compose([
                Validators.required,
                Validators.pattern(/\d/),
                Validators.pattern(/[A-Z]/),
                Validators.pattern(/[a-z]/),
                Validators.pattern(/[!@#$%^&*(),./]/),
                Validators.minLength(8),
            ])],

            passwordConfirm: [this.user.passwordConfirm, Validators.compose([
                Validators.required,
            ])],
        },
        {
            validator: this.mustMatch('password', 'passwordConfirm')
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        var tempUser = <IUser>{};
        tempUser.userName = this.registerForm.value.name;
        tempUser.email = this.registerForm.value.email;
        tempUser.phoneNumber = this.registerForm.value.phoneNumber;
        tempUser.password = this.registerForm.value.password;
        tempUser.displayName = this.registerForm.value.displayName;

        this.api.postRegisterUser(tempUser).subscribe(res => {
            if (res) {
                this.toastr.success("Konto zostało utworzone", "Sukces!");
                this.router.navigate(["login"]);
            } else {
                this.toastr.error("Tworzenie konta nie powiodło się", "Error!");
                //this.registerForm.setErrors({ "register": "User registration failed." });
                console.log("nie idało sie hehe");
            }
        }, error => {
            this.toastr.error("Tworzenie konta nie powiodło się", "Error!");
            //this.registerForm.setErrors({ "register": "User registration failed." });
        });
    }

    getFormControl(name: string) {
        return this.registerForm.get(name);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return e.touched && !e.valid;
    }

    routeToLogin() {
        this.router.navigate(['/login']);
    }

    mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}

