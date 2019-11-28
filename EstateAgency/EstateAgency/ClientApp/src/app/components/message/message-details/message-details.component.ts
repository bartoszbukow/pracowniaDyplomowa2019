import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageModel } from "./../../../models/message.model";
import { ToastrService } from 'ngx-toastr';
import { responseNumbers } from './../../../constants/responseNumbers';
import { Observable, interval } from 'rxjs';
import { startWith, switchMap, takeWhile } from "rxjs/operators";

@Component({
    selector: 'app-message-details',
    templateUrl: './message-details.component.html',
    styleUrls: ['./message-details.component.less']
})
export class MessageDetailsComponent implements OnInit, OnDestroy {
    conversationId: string;
    messages: IMessagesInConversation;
    myId: string;
    messageForm: FormGroup;
    message: MessageModel = new MessageModel();

    groupsWithDevices$: Observable<IMessagesInConversation>;
    private activePage: boolean;

    dateToReturn: { title: string, pathToReturn: string } = {
        title: "Wiadomość",
        pathToReturn: "message/my"
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private api: ApiService,
        private auth: AuthService,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) {
        this.conversationId = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        if (!this.auth.isLoggedIn()) {
            this.router.navigate((['home']));
        }

        this.activePage = true;
        if (this.isLoggedIn()) {
            this.api.getUserId().subscribe(res => { this.myId = <string>res });
        }

        this.groupsWithDevices$ = interval(5000)
            .pipe(
                takeWhile(() => this.activePage),
                startWith(0),
                switchMap(() => this.api.getConversation(this.conversationId)));

        this.groupsWithDevices$.subscribe(res => {
            this.messages = res;
        });

        this.createForm();
    }

    ngOnDestroy() {
        this.activePage = false;
    }

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }

    createForm() {
        this.messageForm = this.fb.group({
            messageContent: [this.message.messageContent, Validators.compose([
                Validators.maxLength(2000)
            ])],

        });
    }

    getFormControl(name: string) {
        return this.messageForm.get(name);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return e.touched && !e.valid;
    }

    sendMessage() {
        if (this.messages === null || this.messageForm.value.messageContent === null ) {
            return;
        }

        var tmpMessage = <IMessageCreate>{};

        if (this.messages[0].senderId === this.myId) {
            tmpMessage.recipientEmail = this.messages[0].recipientEmail;
        }
        else {
            tmpMessage.recipientEmail = this.messages[0].recipientEmail;
        }

        tmpMessage.messageContent = this.messageForm.value.messageContent;
        tmpMessage.conversationId = this.conversationId;

        this.api.postMessage(tmpMessage).subscribe(res => {
            this.messageForm.reset();
            this.toastr.success(responseNumbers[110], "Sukces!");
        }, error => {
            this.messageForm.setErrors({ "error": responseNumbers[111] });
        });
    }

    trackByFn(index, item) {
        return item.id;
    }
}
