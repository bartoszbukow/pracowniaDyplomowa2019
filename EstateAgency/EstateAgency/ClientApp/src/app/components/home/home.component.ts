import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    advertisements: IAdvertisement[];

    constructor(private api: ApiService){ }

    ngOnInit() {
        this.api.getAdvertisementList().subscribe(res => {
            this.advertisements = res;
        });
    }
}
