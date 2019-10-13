import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-advertisement',
    templateUrl: './advertisement.component.html',
    styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
    advertisement: IAdvertisement;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private api: ApiService) {
    }

    ngOnInit() {
        this.advertisement = <IAdvertisement>{};

        var id = this.activatedRoute.snapshot.paramMap.get('id');

        if (id) {
            this.api.getAdvertisement(id).subscribe(res =>
                this.advertisement = res
            );
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate(["home"]);
        }
    }

    onEdit() {
        this.router.navigate(["advertisement/edit", this.advertisement.id]);
    }

    onDelete() {
        this.api.deleteAdvertisement(this.advertisement.id).subscribe(res => {
            console.log("Advertisement " + this.advertisement.id + " has been deleted.");
            this.router.navigate(["home"]);
        }, error => console.log(error));
    }
}
