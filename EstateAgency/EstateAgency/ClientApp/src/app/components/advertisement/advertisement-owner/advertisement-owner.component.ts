import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-advertisement-owner',
    templateUrl: './advertisement-owner.component.html',
    styleUrls: ['./advertisement-owner.component.less']
})
export class AdvertisementOwnerComponent implements OnInit {
    advertisements: IAdvertisement[];

    dateToReturn: { title: string, pathToReturn: string } = {
        title: "Moje ogłoszenia",
        pathToReturn: "home"
    }

    constructor(private api: ApiService,
        private router: Router,) { }

    ngOnInit() {
        this.api.getAdvertisementListOfUser().subscribe(res => {
            this.advertisements = res;
        });
    }

    goToAdvertisementAdd() {
        this.router.navigate(["advertisement/create"]);
    }
}
