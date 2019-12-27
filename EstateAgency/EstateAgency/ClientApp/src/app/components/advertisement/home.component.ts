import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { countAdvertisements } from './../../constants/countAdvertisements';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  advertisements: IAdvertisement[];
  pageNumber: number = 1;
  pageCount: number;

  constructor(private api: ApiService) { }

  ngOnInit() {
    localStorage.removeItem("search");
    this.getAdvertisementList();
  }

  getAdvertisementList() {

    var data = {
      maxRecord: countAdvertisements,
      pageNumber: this.pageNumber
    }

    if (localStorage.getItem("search") !== undefined || localStorage.getItem("search") !== null) {
      data["title"] = localStorage.getItem("search");
    }

    this.api.getAdvertisementList(data).subscribe(res => {
      this.advertisements = res.advertisements;
      this.pageCount = res.pageCount;
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
}
