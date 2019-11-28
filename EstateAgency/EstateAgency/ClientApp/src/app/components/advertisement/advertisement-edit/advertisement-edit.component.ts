 import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdvertisementModel } from "./../../../models/advertisement.model";
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

class ImageSnipped {
    constructor(public src: string, public file: File) {

    }
}

@Component({
    selector: 'app-advertisement-edit',
    templateUrl: './advertisement-edit.component.html',
    styleUrls: ['./advertisement-edit.component.css']
})
export class AdvertisementEditComponent implements OnInit {
    editAdvertisementForm: FormGroup;
    advertisementModel: AdvertisementModel = new AdvertisementModel();
    selectedFileList: Array<ImageSnipped>;
    formData: FormData = new FormData();
    numberOfPhotos: number = 0;

    dateToReturn: { title: string, pathToReturn: string } = {
        title: "Edycja ogłoszenia",
        pathToReturn: "locationBack"
    }

    constructor(
        private fb: FormBuilder,
        private api: ApiService,
        private router: Router,
        private toastr: ToastrService,
        private _location: Location,
        private activatedRoute: ActivatedRoute,
        ) { }

    ngOnInit() {
        this.selectedFileList = new Array<ImageSnipped>();
        this.createForm()

        var id = this.activatedRoute.snapshot.paramMap.get('id');

        if (id) {
            this.api.getAdvertisement(id).subscribe(res => {
                this.editAdvertisementForm.setValue({
                    id: res.id,
                    title: res.title,
                    category: res.category,
                    description: res.description,
                    yardage: res.yardage,
                    numberOfRoom: res.numberOfRoom,
                    price: res.price,
                    city: res.city,
                    address: res.address,
                    images: res.images
                });

                this.numberOfPhotos = res.images.length;

                if (this.editAdvertisementForm.value.images[0].path === "empty-photo.jpg") {
                    this.removeNewImage(0);
                }
            });
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate(["home"]);
        }
    }

    createForm() {
        this.editAdvertisementForm = this.fb.group({
            id: [this.advertisementModel.id],
            title: [this.advertisementModel.title, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50)
            ])],
            category: [this.advertisementModel.category, Validators.compose([
                Validators.required,
            ])],
            description: [this.advertisementModel.desciption, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(2000)
            ])],
            yardage: [this.advertisementModel.yardage, Validators.compose([
                Validators.required,
                Validators.pattern('^[0-9]{1,}$'),
                Validators.maxLength(10)
            ])],
            numberOfRoom: [this.advertisementModel.numberOfRoom, Validators.compose([
                Validators.required,
                Validators.pattern('^[0-9]{1,}$'),
                Validators.maxLength(10)
            ])],
            price: [this.advertisementModel.price, Validators.compose([
                Validators.required,
                Validators.pattern('^[0-9]{1,}$'),
                Validators.maxLength(20)
            ])],
            city: [this.advertisementModel.city, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
                Validators.pattern('^[A-ZĄĘŁŃÓŚŹŻ][a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+(?:[\s-][a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+)*$'),
            ])],
            address: [this.advertisementModel.address, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
                Validators.pattern('^[A-ZĄĘŁŃÓŚŹŻ][a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+[ ]*[1-9]*[ ]*[/]*[ ]*[1-9]*$'),
            ])],
            images: [this.advertisementModel.images]
        });
    }

    getFormControl(name: string) {
        return this.editAdvertisementForm.get(name);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return e.touched && !e.valid;
    }

    editAdvertisement() {
        if (!this.editAdvertisementForm.valid) {
            return;
        }

        for (var key in this.editAdvertisementForm.value) {
            if (this.editAdvertisementForm.value.hasOwnProperty(key)) {
                if (key === "images") {
                    let element = this.editAdvertisementForm.value[key];
                    for (var i = 0; i < element.length; i++) {
                        var value = element[i].id;
                        var id = "image" + i;
                        this.formData.append(id, value);
                    }
                }
                else {
                    let element = this.editAdvertisementForm.value[key];
                    this.formData.append(key, element);
                }
            }
        }

        let additionalData = { reportProgress: true, observe: 'events' };

        this.api.putAdvertisement(this.formData, additionalData)
            .subscribe(res => {
                this.toastr.success("Ogłoszenie zostało edytowane", "Sukces!");
                this.router.navigate(["home"]);
            }, error => {
                this.toastr.error("Nie udało się edytować ogłoszenia", "Error!");
            });
    }

    uploadFile = (files) => {
        if (files.length === 0) {
            return;
        }

        let filesToUpload: File[] = files;

        Array.from(filesToUpload).map((file, index) => {
            return this.formData.append('file' + index, file, file.name);
        });

        for (let file of files) {
            let reader = new FileReader();
            reader.addEventListener('load', (event: any) => {
                if (this.numberOfPhotos < 8) {
                    this.numberOfPhotos += 1;
                    this.selectedFileList.push(new ImageSnipped(event.target.result, file));
                }
            });

            reader.readAsDataURL(file);
        }
    }

    backClicked() {
        this._location.back();
    }

    removePreviewImage(i) {
        if (i !== undefined) {
            this.selectedFileList.splice(i, 1);
            this.numberOfPhotos -= 1;
        }
    }

    removeNewImage(i) {
        if (i !== undefined) {
            this.editAdvertisementForm.value.images.splice(i, 1);
            this.numberOfPhotos -= 1;
        }
    }

    deleteAdvertisement() {
        let data = {
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                id: this.editAdvertisementForm.value.id
            }
        }
        this.api.deleteAdvertisement(data).subscribe(res => {
            this.toastr.success("Ogłoszenie zostało usunięte", "Sukces!");
            this.router.navigate(["home"]);
        }, error => {
            this.toastr.error("Nie udało się usunąć ogłoszenia", "Error!");
        });
    }
}
