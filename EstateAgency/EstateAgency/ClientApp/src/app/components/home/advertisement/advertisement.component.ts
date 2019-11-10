import { Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
declare let $: any; 

@Component({
    selector: 'app-advertisement',
    templateUrl: './advertisement.component.html',
    styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
    advertisement: IAdvertisement;
    url: string;
    @ViewChild('slider', { static: true }) slider: ElementRef;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private api: ApiService,
        public auth: AuthService,
        @Inject('BASE_URL') baseUrl: string)
    {
        this.url = baseUrl;
    }

    ngOnInit() {
        this.advertisement = <IAdvertisement>{};

        var id = this.activatedRoute.snapshot.paramMap.get('id');

        if (id) {
            this.api.getAdvertisement(id).subscribe(res => {
                this.advertisement = res;
                console.log(res);
            });
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate(["home"]);
        }

        $(this.slider.nativeElement).carousel({
            interval: 40000
        })
    }

    //onEdit() {
    //    this.router.navigate(["advertisement/edit", this.advertisement.id]);
    //}

    //onDelete() {
    //    this.api.deleteAdvertisement(this.advertisement.id).subscribe(res => {
    //        console.log("Advertisement " + this.advertisement.id + " has been deleted.");
    //        this.router.navigate(["home"]);
    //    }, error => console.log(error));
    //}

    prevSlide = () => {
        $(this.slider.nativeElement).carousel('prev');
    }

    nextSlide = () => {
        $(this.slider.nativeElement).carousel('next');
    }

    goToSlide = (index) => {
        $(this.slider.nativeElement).carousel(index);
    }
}
