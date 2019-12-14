import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
    selector: 'app-advertisement-management',
    templateUrl: './advertisement-management.component.html',
    styleUrls: ['./advertisement-management.component.less']
})
export class AdvertisementManagementComponent implements OnInit {
    advertisementList: Array<IAdvertisementManagement>;

    constructor(
        private api: ApiService
    ) { }

    ngOnInit() {
        this.api.getAplicationAdvertisements().subscribe(res => {
            this.advertisementList = res;
        });
    }

    lockAdvertisement(userId) {
        var data = {};
        data["id"] = userId;
        data["management"] = "lock";

        this.api.putAdvertisementManagement(data).subscribe(res => {
            this.advertisementList = res;
        })
    }

    unlockAdvertisement(userId) {
        var data = {};
        data["id"] = userId;
        data["management"] = "unlock";

        this.api.putAdvertisementManagement(data).subscribe(res => {
            this.advertisementList = res;
        })
    }
}
