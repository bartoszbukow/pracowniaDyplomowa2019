import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { Router } from "@angular/router";
import { ModalService } from './../../../services/modal.service';
import { AdvertisementDeleteModalComponent } from './../../modals/advertisement-delete-modal/advertisement-delete-modal.component';
declare let $: any;

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {
  @Input() advertisements: IAdvertisement[];
  @Input() pageNumber: number;
  @Input() pageCount: number;
  @Output() pageNumberChanged = new EventEmitter();
  @Output() deletedAdvertisement = new EventEmitter();

  selectedAdvertisement: IAdvertisement;
  url: string;
  private userId: string;

  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private auth: AuthService,
    private api: ApiService,
    private modalService: ModalService,
    private router: Router) {
    this.url = baseUrl;
  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.api.getUserId().subscribe(res => { this.userId = <string>res });
    }
  }

  isLoggedIn = (): boolean => {
    return this.auth.isLoggedIn();
  }

  onSelect = (advertisement: IAdvertisement): void => {
    this.selectedAdvertisement = advertisement;
    this.router.navigate(["advertisement", this.selectedAdvertisement.id]);
  }

  onEdit = (advertisement: IAdvertisement): void => {
    this.selectedAdvertisement = advertisement;
    this.router.navigate(["advertisement/edit", this.selectedAdvertisement.id]);
  }

  IAmOwnerOfAdvertisement = (advertisement: IAdvertisement): boolean => {
    if (this.isLoggedIn() && advertisement.userId === this.userId) {
      return true;
    }
    return false;
  }

  goToPage = (n: number): void => {
    this.pageNumberChanged.emit(n);
  }

  onNext = (): void => {
    this.pageNumberChanged.emit(this.pageNumber + 1);
  }

  onPrev = (): void => {
    this.pageNumberChanged.emit(this.pageNumber - 1);
  }

  onCreateModalAdvertisementDelete = (advertisement: IAdvertisement): void => {
    const modalRef = this.modalService.open(AdvertisementDeleteModalComponent, { advertisement: advertisement });
    modalRef.onResult().subscribe(
      closed => {
        this.deletedAdvertisement.emit();
        $("body").removeAttr("style");
      },
      dismissed => { }
    );
  }
}
