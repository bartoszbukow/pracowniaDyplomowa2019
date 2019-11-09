import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-advertisement-edit',
    templateUrl: './advertisement-edit.component.html',
    styleUrls: ['./advertisement-edit.component.css']
})

export class AdvertisementEditComponent implements OnInit {
    title: string;
    advertisement: IAdvertisement;
    editMode: boolean;
    advertisementId: string;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router, 
        private api: ApiService) {

        this.advertisementId = this.activatedRoute.snapshot.params["id"];
    }

    ngOnInit() {
        this.advertisement = <IAdvertisement>{};
        if (this.advertisementId) {
            this.editMode = true;

            this.api.getAdvertisement(this.advertisementId).subscribe(res => {
                this.advertisement = res;
                this.title = "Edit - " + this.advertisement.title;
            },
                error => console.error(error));
        }
        else {
            this.editMode = false;
            this.title = "Create a new Advertisement";
        }

    }

    onSubmit(advertisement: IAdvertisement) {
        
        //if (this.editMode) {
        //    this.api.putAdvertisement(advertisement).subscribe(res => {
        //        var v = res;
        //        console.log("Advertisement " + v.id + " has been updated.");
        //        this.router.navigate(["home"]);
        //    },
        //        error => console.log(error));
        //} else {
        //    this.api.postAdvertisement(advertisement).subscribe(res => {
        //        var q = res;
        //        console.log("Advertisement " + q.id + " has been created.");
        //        this.router.navigate(["home"]);
        //    },
        //        error => console.log(error));
        //}
    }

    onBack() {
        this.router.navigate(["home"]);
    }
} 
