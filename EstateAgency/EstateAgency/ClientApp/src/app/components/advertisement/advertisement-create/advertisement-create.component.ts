import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdvertisementModel } from "./../../../models/advertisement.model";
import { ApiService } from '../../../services/api.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-advertisement-create',
    templateUrl: './advertisement-create.component.html',
    styleUrls: ['./advertisement-create.component.less']
})
export class AdvertisementCreateComponent implements OnInit {

    createAdvertisementForm: FormGroup;
    advertisementModel: AdvertisementModel = new AdvertisementModel();

    constructor(
        private fb: FormBuilder,
        private api: ApiService,
        private router: Router,)
    { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.createAdvertisementForm = this.fb.group({
            title: [this.advertisementModel.title, Validators.compose([
                Validators.required
            ])],
            category: [this.advertisementModel.category, Validators.compose([
                Validators.required
            ])],
            description: [this.advertisementModel.desciption, Validators.compose([
                Validators.required
            ])],
            yardage: [this.advertisementModel.yardage, Validators.compose([
                Validators.required
            ])],
            numberOfRoom: [this.advertisementModel.numberOfRoom, Validators.compose([
                Validators.required
            ])],
            price: [this.advertisementModel.price, Validators.compose([
                Validators.required
            ])],
            city: [this.advertisementModel.city, Validators.compose([
                Validators.required
            ])],
            address: [this.advertisementModel.address, Validators.compose([
                Validators.required
            ])],
            photos: [this.advertisementModel.photos, Validators.compose([
                Validators.required
            ])],
        });
    }

    getFormControl(name: string) {
        return this.createAdvertisementForm.get(name);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return e.touched && !e.valid;
    }

    createAdvertisement() {

        let advertisement = Object.assign({}, this.createAdvertisementForm.value);
        this.api.putAdvertisement(advertisement).subscribe(res => {
            var q = res;
            console.log("Advertisement " + q.id + " has been created.");
            this.router.navigate(["home"]);
        },
            error => console.log(error));
    }
}
