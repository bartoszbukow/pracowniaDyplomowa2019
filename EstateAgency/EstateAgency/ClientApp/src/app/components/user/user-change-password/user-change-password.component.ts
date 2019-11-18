import { ApiService } from '../../../services/api.service';
import { ChangePasswordModel } from "./../../../models/userchangePassword.model";
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { responseNumbers } from './../../../constants/responseNumbers';

@Component({
    selector: 'app-user-change-password',
    templateUrl: './user-change-password.component.html',
    styleUrls: ['./user-change-password.component.less']
})
export class UserChangePasswordComponent implements OnInit {

    changePasswordForm: FormGroup;
    changePasswordModel: ChangePasswordModel = new ChangePasswordModel();

    constructor(private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        private api: ApiService,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate((['home']));
        }
        this.createForm();
    }

    createForm() {
        this.changePasswordForm = this.fb.group({

            password: [this.changePasswordModel.password, Validators.compose([
                Validators.required,
                Validators.pattern(/\d/),
                Validators.pattern(/[A-Z]/),
                Validators.pattern(/[a-z]/),
                Validators.pattern(/[!@#$%^&*(),./]/),
                Validators.minLength(8),
            ])],

            passwordNew: [this.changePasswordModel.passwordNew, Validators.compose([
                Validators.required,
                Validators.pattern(/\d/),
                Validators.pattern(/[A-Z]/),
                Validators.pattern(/[a-z]/),
                Validators.pattern(/[!@#$%^&*(),./]/),
                Validators.minLength(8),
            ])],

            passwordConfirm: [this.changePasswordModel.passwordConfirm, Validators.compose([
                Validators.required,
            ])],
        },
            {
                validator: this.mustMatch('passwordNew', 'passwordConfirm')
            });
    }

    get f() {
        return this.changePasswordForm.controls;
    }

    changePassword() {
        if (!this.changePasswordForm.valid) {
            return;
        }
        var tempUser = <IPasswordChange>{};
        tempUser.oldPassword = this.changePasswordForm.value.password;
        tempUser.newPassword = this.changePasswordForm.value.passwordNew;

        this.api.putUserChangePassword(tempUser).subscribe(res => {
            this.toastr.success(responseNumbers[101], "Sukces!");
            this.router.navigate(["home"]);
        },
            error => {
                this.changePasswordForm.setErrors({ "changePassword": responseNumbers[error.error] });
            });
    }

    getFormControl(name: string) {
        return this.changePasswordForm.get(name);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return e.touched && !e.valid;
    }

    routeToHome() {
        this.router.navigate(['home']);
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
