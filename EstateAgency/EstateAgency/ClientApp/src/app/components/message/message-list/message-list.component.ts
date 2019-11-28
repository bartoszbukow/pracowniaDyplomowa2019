import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.less']
})
export class MessageListComponent implements OnInit {
    myMessagesList: any;

    dateToReturn: { title: string, pathToReturn: string } = {
        title: "Moje wiadomości",
        pathToReturn: "home"
    }

    constructor(
        private api: ApiService
    ) { }

    ngOnInit() {
        this.api.getMyMessages().subscribe(res => {
            this.myMessagesList = res;
        })
    }
}
