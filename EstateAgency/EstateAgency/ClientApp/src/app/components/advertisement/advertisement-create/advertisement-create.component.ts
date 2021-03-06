import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AdvertisementModel } from "./../../../models/advertisement.model";
import { ApiService } from '../../../services/api.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-advertisement-create',
  templateUrl: './advertisement-create.component.html',
  styleUrls: ['./advertisement-create.component.less']
})
export class AdvertisementCreateComponent implements OnInit {
  createAdvertisementForm: FormGroup;
  advertisementModel: AdvertisementModel = new AdvertisementModel();
  selectedFileList: Array<ImageSnipped>;
  formData: FormData = new FormData();

  dateToReturn: { title: string, pathToReturn: string } = {
    title: "Nowe ogłoszenie",
    pathToReturn: "home"
  }

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private _location: Location) { }

  ngOnInit() {
    this.selectedFileList = new Array<ImageSnipped>();
    this.createForm();
  }

  createForm = (): void => {
    this.createAdvertisementForm = this.fb.group({
      title: [this.advertisementModel.title, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      type: [this.advertisementModel.type, Validators.compose([
        Validators.required,
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
      ])]
    });
  }

  getFormControl = (name: string): AbstractControl => {
    return this.createAdvertisementForm.get(name);
  }

  hasError = (name: string): boolean => {
    var e = this.getFormControl(name);
    return e.touched && !e.valid;
  }

  createAdvertisement = (): void => {
    if (!this.createAdvertisementForm.valid) {
      return;
    }

    if (this.createAdvertisementForm.value.type === "Wynajem") {
      this.createAdvertisementForm.value.type = 1;
    }
    else {
      this.createAdvertisementForm.value.type = 0;
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
        this.toastr.success("Ogłoszenie zostało utworzone", "Sukces!");
        this.router.navigate(["home"]);
      }, error => {
        this.toastr.error("Nie udało się dodać ogłoszenia", "Error!");
      });
  }

  uploadFile = (files: File[]): void => {
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
        if (this.selectedFileList.length < 8) {
          this.selectedFileList.push(new ImageSnipped(event.target.result, file));
        }
      });

      reader.readAsDataURL(file);
    }
  }

  backClicked = (): void => {
    this._location.back();
  }

  removeImage = (i: number): void => {
    if (i !== undefined) {
      this.selectedFileList.splice(i, 1);
    }
  }
}

class ImageSnipped {
  constructor(public src: string, public file: File) {

  }
}
