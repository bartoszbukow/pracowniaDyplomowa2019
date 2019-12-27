import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SerchModel } from "./../../../models/serch.model";
import { ApiService } from '../../../services/api.service';
import { countAdvertisements } from './../../../constants/countAdvertisements';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  searchFrom: FormGroup;
  serchModel: SerchModel = new SerchModel();
  optionsSelect: Array<any>;
  pageNumber: number = 1;

  @Output() searchedAdvertisement = new EventEmitter();

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
    var data = {
      title: this.searchFrom.value.title,
      maxRecord: countAdvertisements,
      pageNumber: this.pageNumber
    }

    this.api.getSearchedAdvertisements(data).subscribe(res => {
      this.searchedAdvertisement.emit(res.advertisements);
    });
  }
}
