import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-advertisement-owner',
    templateUrl: './advertisement-owner.component.html',
    styleUrls: ['./advertisement-owner.component.less']
})
export class AdvertisementOwnerComponent implements OnInit {
    advertisements: IAdvertisement[];

    dateToReturn: { title: string, pathToReturn: string } = {
        title: "MOJE OGŁOSZENIA",
        pathToReturn: "home"
    }

    constructor(private api: ApiService) { }

    ngOnInit() {
        this.api.getAdvertisementListOfUser().subscribe(res => {
            this.advertisements = res;
        });
    }
}
