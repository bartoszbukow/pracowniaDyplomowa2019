import { Component, OnInit, Inject, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-advertisement-list',
    templateUrl: './advertisement-list.component.html',
    styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {
    selectedAdvertisement: IAdvertisement;
    @Input() advertisements: IAdvertisement[];
    url: string;
    private userId: string;

    constructor(private api: ApiService,
        private router: Router,
        @Inject('BASE_URL') baseUrl: string)
    {
        this.url = baseUrl;
    }

    ngOnInit() {
        this.api.getUserId().subscribe(res => { this.userId = <string>res });
    }

    onSelect(advertisement: IAdvertisement) {
        this.selectedAdvertisement = advertisement;
        this.router.navigate(["advertisement", this.selectedAdvertisement.id]);
    }

    onEdit(advertisement: IAdvertisement) {
        this.selectedAdvertisement = advertisement;
        this.router.navigate(["advertisement/edit", this.selectedAdvertisement.id]);
    }

    IAmOwnerOfAdvertisement(advertisement) {
        if (advertisement.userId === this.userId) {
            return true;
        }
        return false;
    }
}
