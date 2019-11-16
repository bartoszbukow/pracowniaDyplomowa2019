import { ApiService } from '../../../services/api.service';
import { RegisterModel } from "./../../../models/register.model";
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.less']
})
export class UserEditComponent implements OnInit {

    userEditForm: FormGroup;
    user: RegisterModel = new RegisterModel();

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

        if (this.userEditForm) {
            this.api.getUserEditData().subscribe(res => {
                this.userEditForm.setValue({
                    name: res.userName,
                    phoneNumber: res.phoneNumber,
                    displayName: res.displayName,
                    email: res.email
                });
            });
        }
    }

    createForm() {
        this.userEditForm = this.fb.group({
            name: [this.user.name, Validators.compose([
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

            displayName: [this.user.displayName, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)
            ])],

            email: [this.user.email],
        });
    }

    get f() {
        return this.userEditForm.controls;
    }

    editUser() {
        if (!this.userEditForm.valid) {
            return;
        }
        var tempUser = <IUser>{};
        tempUser.userName = this.userEditForm.value.name;
        tempUser.email = this.userEditForm.value.email;
        tempUser.displayName = this.userEditForm.value.displayName;
        tempUser.phoneNumber = this.userEditForm.value.phoneNumber;

        this.api.putUser(tempUser).subscribe(res => {
            if (res) {
                this.toastr.success("Konto zostało zaktualizowane", "Sukces!");
                this.router.navigate(["home"]);
            } else {
                this.toastr.error("Aktualizacja konta nie powiodło się", "Error!");
            }
        }, error => {
            this.toastr.error("Aktualizacja konta nie powiodło się", "Error!");
        });
    }

    getFormControl(name: string) {
        return this.userEditForm.get(name);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return e.touched && !e.valid;
    }

    routeToHome() {
        this.router.navigate(['home']);
    }
}
