import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SerchModel } from "./../../../models/serch.model";
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchFrom: FormGroup;
  serchModel: SerchModel = new SerchModel();

  @Output() searchedAdvertisement = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.searchFrom.reset();
    localStorage.removeItem("search");
  }

  createForm = (): void => {
    this.searchFrom = this.fb.group({
      title: [this.serchModel.title, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      type: [this.serchModel.type, Validators.compose([
        Validators.required,
      ])],
      yardageFrom: [this.serchModel.yardageFrom, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,}$'),
        Validators.maxLength(10)
      ])],
      yardageTo: [this.serchModel.yardageTo, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,}$'),
        Validators.maxLength(10)
      ])],
      priceFrom: [this.serchModel.priceFrom, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,}$'),
        Validators.maxLength(20)
      ])],
      priceTo: [this.serchModel.priceTo, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,}$'),
        Validators.maxLength(20)
      ])],
    });

    this.searchFrom.controls['type'].setValue("Typ", { onlySelf: true });
  }

  serchAdvertisements = (): void => {

    if (this.searchFrom.value.type === "Wynajem") {
      this.searchFrom.value.type = 1;
    }
    else if (this.searchFrom.value.type === "Sprzedaz") {
      this.searchFrom.value.type = 0;
    }
    else {
      this.searchFrom.value.type = null;
    }

    localStorage.setItem("searchTitle", this.searchFrom.value.title);
    localStorage.setItem("searchType", this.searchFrom.value.type);
    localStorage.setItem("searchYardageTo", this.searchFrom.value.yardageTo);
    localStorage.setItem("searchYardageFrom", this.searchFrom.value.yardageFrom);
    localStorage.setItem("searchPriceTo", this.searchFrom.value.priceTo);
    localStorage.setItem("searchPriceFrom", this.searchFrom.value.priceFrom);
    this.searchedAdvertisement.emit();
  }
}
