import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SerchModel } from "./../../../models/serch.model";

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
      title: [this.serchModel.title]
    });
  }

  serchAdvertisements = (): void => {
    localStorage.setItem("search", this.searchFrom.value.title);
    this.searchedAdvertisement.emit();
  }
}
