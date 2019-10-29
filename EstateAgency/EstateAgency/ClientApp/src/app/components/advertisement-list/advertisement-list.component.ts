import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-advertisement-list',
    templateUrl: './advertisement-list.component.html',
    styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {
    title: string;
    selectedAdvertisement: IAdvertisement;
    advertisements: IAdvertisement[];
    url: string;

    constructor(private api: ApiService,
        private router: Router,
        @Inject('BASE_URL') baseUrl: string)
    {
        this.url = baseUrl;
    }

    onSelect(advertisement: IAdvertisement) {
        this.selectedAdvertisement = advertisement;
        this.router.navigate(["advertisement", this.selectedAdvertisement.id]);
    }

    ngOnInit() {
        this.title = "Latest Advertisements";
        this.api.getAdvertisementList().subscribe(res => {
            this.advertisements = res;
        });
    }
}
