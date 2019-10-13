import { Component, OnInit } from '@angular/core';
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

    constructor(private api: ApiService,
      private router: Router) {

    }

    onSelect(quiz: IAdvertisement) {
        this.selectedAdvertisement = quiz;
        console.log("advertisement with Id " + this.selectedAdvertisement.id + " has been selected.");
        this.router.navigate(["advertisement", this.selectedAdvertisement.id]); 
    }

    ngOnInit() {
        this.title = "Latest Advertisements";
        this.api.getAdvertisementList().subscribe(res =>
            this.advertisements = res
        );
    }

}
