import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageModel } from "./../../../models/message.model";
import { ToastrService } from 'ngx-toastr';
import { responseNumbers } from './../../../constants/responseNumbers';
import { Location } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-message-create',
    templateUrl: './message-create.component.html',
    styleUrls: ['./message-create.component.less']
})
export class MessageCreateComponent implements OnInit, AfterContentInit {

    messageForm: FormGroup;
    message: MessageModel = new MessageModel();
    recipientsEmail: string = null;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        private toastr: ToastrService,
        private _location: Location,
        private api: ApiService) {

        if (this.router.getCurrentNavigation().extras.state !== undefined) {
            this.recipientsEmail = this.router.getCurrentNavigation().extras.state.email;
        }
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate((['home']));
        }
        this.createForm();
    }

    ngAfterContentInit() {
        if (this.recipientsEmail !== null) {
            this.messageForm.patchValue({
                recipientEmail: this.recipientsEmail
            });
        }
    }

    createForm() {
        this.messageForm = this.fb.group({
            recipientEmail: [this.message.recipientEmail, Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$'),
            ])],
            messageContent: [this.message.messageContent, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(2000)
            ])],

        });
    }

    onSubmit() {
        var tmpMessage = <IMessageCreate>{};
        tmpMessage.recipientEmail = this.messageForm.value.recipientEmail;
        tmpMessage.messageContent = this.messageForm.value.messageContent;

        this.api.postMessage(tmpMessage).subscribe(res => {
            this.toastr.success(responseNumbers[110], "Sukces!");
            this._location.back();
        }, error => {
            this.messageForm.setErrors({ "error": responseNumbers[111] });
        });
    }

    getFormControl(name: string) {
        return this.messageForm.get(name);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return e.touched && !e.valid;
    }

    backToPage() {
        this._location.back();
    }
}
