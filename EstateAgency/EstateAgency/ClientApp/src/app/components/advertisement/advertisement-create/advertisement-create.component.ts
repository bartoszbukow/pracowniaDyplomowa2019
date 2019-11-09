import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdvertisementModel } from "./../../../models/advertisement.model";
import { ApiService } from '../../../services/api.service';
import { Router } from "@angular/router";
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-advertisement-create',
    templateUrl: './advertisement-create.component.html',
    styleUrls: ['./advertisement-create.component.less']
})
export class AdvertisementCreateComponent implements OnInit {
    createAdvertisementForm: FormGroup;
    advertisementModel: AdvertisementModel = new AdvertisementModel();

    //public progress: number;
    //public message: string;
   
    formData: FormData = new FormData();

    constructor(
        private fb: FormBuilder,
        private api: ApiService,
        private router: Router)
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
            ])]
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
        if (!this.createAdvertisementForm.valid) {
            return;
        }

        for (var key in this.createAdvertisementForm.value) {
            if (this.createAdvertisementForm.value.hasOwnProperty(key)) {
                let element = this.createAdvertisementForm.value[key];
                this.formData.append(key, element);
            }
        }

        let additionalData = { reportProgress: true, observe: 'events' };

        this.api.postAdvertisement(this.formData, additionalData)
            .subscribe(event => {
                //if (event.type === HttpEventType.UploadProgress)
                //    this.progress = Math.round(100 * event.loaded / event.total);
                //else if (event.type === HttpEventType.Response) {
                //    this.message = 'Upload success.';
                //    this.onUploadFinished.emit(event.body);
                //}
                this.router.navigate(["home"]);
            },
                error => console.log(error));
    }

    uploadFile = (files) => {
        if (files.length === 0) {
            return;
        }

        let filesToUpload: File[] = files;

        Array.from(filesToUpload).map((file, index) => {
            return this.formData.append('file' + index, file, file.name);
        });
    }
}
