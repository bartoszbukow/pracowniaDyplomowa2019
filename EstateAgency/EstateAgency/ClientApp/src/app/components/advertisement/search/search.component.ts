import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SerchModel } from "./../../../models/serch.model";
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

    searchFrom: FormGroup;
    serchModel: SerchModel = new SerchModel();

    constructor(
        private fb: FormBuilder,
        private api: ApiService,
    ) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.searchFrom = this.fb.group({
            title: [this.serchModel.title]
        });
    }

    serchAdvertisements() {

        this.api.getSerchedAdvertisements(this.searchFrom.value.title).subscribe(res => {
            console.log("udalos sie!");
        });
    }
}
