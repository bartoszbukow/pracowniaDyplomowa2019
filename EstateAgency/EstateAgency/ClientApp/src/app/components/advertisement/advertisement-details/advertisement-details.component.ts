import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { Location } from '@angular/common';
import { ModalService } from './../../../services/modal.service';
import { ReservationCreateModalComponent } from './../../modals/reservation-create-modal/reservation-create-modal.component';
declare let $: any;

@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
  styleUrls: ['./advertisement-details.component.css']
})
export class AdvertisementComponent implements OnInit {
  advertisement: IAdvertisement;
  url: string;
  @ViewChild('slider', { static: true }) slider: ElementRef;
  private userId: string;

  dateToReturn: { title: string, pathToReturn: string } = {
    title: "Szczegóły ogłoszenia",
    pathToReturn: "locationBack"
  }

  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public auth: AuthService,
    private _location: Location,
    private modalService: ModalService
  ) {
    this.url = baseUrl;
  }

  ngOnInit() {
    this.advertisement = <IAdvertisement>{};
    var id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.api.getAdvertisement(id).subscribe(res => {
        this.advertisement = res;
      });

      if (this.isLoggedIn()) {
        this.api.getUserId().subscribe(res => { this.userId = <string>res });
      }

    }
    else {
      this.router.navigate(["home"]);
    }

    $(this.slider.nativeElement).carousel({
      interval: 40000
    })
  }

  prevSlide = (): void => {
    $(this.slider.nativeElement).carousel('prev');
  }

  nextSlide = (): void => {
    $(this.slider.nativeElement).carousel('next');
  }

  goToSlide = (index: number): void => {
    $(this.slider.nativeElement).carousel(index);
  }

  backClicked = (): void => {
    this._location.back();
  }

  routeToContact = (): void => {
    const navigationExtras: NavigationExtras = { state: { email: this.advertisement.email } };
    this.router.navigate(["message/create"], navigationExtras);
  }

  onCreateModalReservationCreate = (): void => {
    const modalRef = this.modalService.open(ReservationCreateModalComponent, { advertisement: this.advertisement });

    modalRef.onResult().subscribe(
      closed => { },
      dismissed => { }
    );
  }

  isLoggedIn = (): boolean => {
    return this.auth.isLoggedIn();
  }

  IAmOwnerOfAdvertisement = (): boolean => {
    if (this.isLoggedIn() && this.advertisement.userId === this.userId) {
      return true;
    }
    return false;
  }
}
