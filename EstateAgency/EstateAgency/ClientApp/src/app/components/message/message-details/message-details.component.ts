import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from './../../../services/auth.service';

@Component({
    selector: 'app-message-details',
    templateUrl: './message-details.component.html',
    styleUrls: ['./message-details.component.less']
})
export class MessageDetailsComponent implements OnInit {
    conversationId: string;
    messages: IMessagesInConversation;
    myId: string;

    dateToReturn: { title: string, pathToReturn: string } = {
        title: "WIADOMOŚĆ",
        pathToReturn: "message/my"
    }

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private auth: AuthService,
    ) {
        this.conversationId = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        if (this.isLoggedIn()) {
            this.api.getUserId().subscribe(res => { this.myId = <string>res });
        }

        this.api.getConversation(this.conversationId).subscribe(res => {
            this.messages = res;
        })
    }

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }
}
