import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    title: string;
    form: FormGroup;

    constructor(private router: Router,
        private fb: FormBuilder,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string) {

        this.title = "New User Registration";
        // initialize the form
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.form = this.fb.group({
            Username: ['', Validators.required],
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', Validators.required],
            PasswordConfirm: ['', Validators.required],
            DisplayName: ['', Validators.required]
        }, {
            validator: this.passwordConfirmValidator
        });
    }

    onSubmit() {
        // build a temporary user object from form values
        var tempUser = <IUser>{};
        tempUser.username = this.form.value.Username;
        tempUser.email = this.form.value.Email;
        tempUser.password = this.form.value.Password;
        tempUser.displayName = this.form.value.DisplayName;

        var url = this.baseUrl + "api/user";

        this.http.post<IUser>(url, tempUser).subscribe(res => {
            if (res) {
                var v = res;
                console.log("User " + v.username + " has been created.");
                // redirect to login page
                this.router.navigate(["login"]);
            } else {
                // registration failed
                this.form.setErrors({ "register": "User registration failed." });
            }
        }, error => console.log(error));
    }

    onBack() {
        this.router.navigate(["home"]);
    }

    passwordConfirmValidator(control: FormControl): any {
        let p = control.root.get('Password');
        let pc = control.root.get('PasswordConfirm');

        if (p && pc) {
            if (p.value !== pc.value) {
                pc.setErrors({ "PasswordMismatch": true });
            } else {
                pc.setErrors(null);
            }
        }
        return null;
    }

    getFormControl(name: string) {
        return this.form.get(name);
    }

    isValid(name: string) {
        var e = this.getFormControl(name); return e && e.valid;
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

