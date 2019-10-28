import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private api: ApiService) {

    }

    ngOnInit() {

        //this.api.getAdvertisement("19d799a7-f65a-4b3d-b4c1-ae78b3fce0c3").subscribe(res => {
        //    console.log(res);
        //})
    }
}
