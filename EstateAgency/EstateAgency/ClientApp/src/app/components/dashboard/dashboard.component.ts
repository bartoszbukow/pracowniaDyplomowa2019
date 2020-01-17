import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { countAdvertisements } from './../../constants/countAdvertisements';
import { PaginationComponent } from './../pagination/pagination.component'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  @ViewChild(PaginationComponent, { static: true }) advertisementList: PaginationComponent;

  advertisements: IAdvertisement[];
  pageNumber: number = 1;
  pageCount: number;

  constructor(private api: ApiService) { }

  ngOnInit() {
    localStorage.removeItem("searchTitle");
    localStorage.removeItem("searchTitle");
    localStorage.removeItem("searchType");
    localStorage.removeItem("searchYardageTo");
    localStorage.removeItem("searchYardageFrom");
    localStorage.removeItem("searchPriceTo");
    localStorage.removeItem("searchPriceFrom");
    this.getAdvertisementList();
  }

  getAdvertisementList() {
    var data = {
      maxRecord: countAdvertisements,
      pageNumber: this.pageNumber,
      title: "",
      yardageTo: 0,
      yardageFrom: 0,
      priceTo: 0,
      priceFrom: 0,
      type: -1
    }

    if (localStorage.getItem("searchTitle") !== undefined && localStorage.getItem("searchTitle") !== null) {
      data["title"] = localStorage.getItem("searchTitle");
    }

    if (this.isNumberValidator("searchYardageTo")) {
      data.yardageTo = Number(localStorage.getItem("searchYardageTo"));
    }

    if (this.isNumberValidator("searchYardageFrom")) {
      data.yardageFrom = Number(localStorage.getItem("searchYardageFrom"));
    }

    if (this.isNumberValidator("searchPriceTo")) {
      data.priceTo = Number(localStorage.getItem("searchPriceTo"));
    }

    if (this.isNumberValidator("searchPriceFrom")) {
      data.priceFrom = Number(localStorage.getItem("searchPriceFrom"));
    }

    if (this.isNumberValidator("searchType")) {
      data.type = Number(localStorage.getItem("searchType"));
    }
    
    this.api.getAdvertisementList(data).subscribe(res => {
      this.advertisements = res.advertisements;

      if (this.pageCount !== res.pageCount)
      {
        this.pageCount = res.pageCount;
        this.pageNumber = 1;
        this.getAdvertisementList();
      }
    });

    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 600) {
        window.scrollTo(0, pos - 50);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  onPageChanged = (pageNumber: number) => {
    this.pageNumber = pageNumber;
    this.getAdvertisementList();
  }

  isNumberValidator = (variableName: string): boolean => {
    var item = localStorage.getItem(variableName);
    if (item !== undefined && item !== null && item !== "null" && item !== "" && !isNaN(Number(item))) return true;
    return false;
  }
}


