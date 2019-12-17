import { Component, OnInit, OnDestroy } from '@angular/core';
import { Modal } from './../../../models/modal.model';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
declare let $: any;

@Component({
  selector: 'app-advertisement-delete-modal',
  templateUrl: './advertisement-delete-modal.component.html',
  styleUrls: ['./advertisement-delete-modal.component.less']
})
export class AdvertisementDeleteModalComponent extends Modal implements OnInit, OnDestroy {

  advertisement: IAdvertisement;
  //private deletedGroupData: any;
  //errorNumber: Readonly<any> = errorNumber;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
  }

  onInjectInputs(inputs): void {
    this.advertisement = inputs.advertisement;
  }

  ngOnDestroy() {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  ngOnInit() {
    $('#modalId').on('hidden.bs.modal', () => {
      this.dismiss('canceling');
    })
  }

  cancel(): void {
    this.dismiss('canceling');
  }

  removeAdvertisement = (advertisementId) => {
    let data = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        id: advertisementId
      }
    }
    this.api.deleteAdvertisement(data).subscribe(res => {
      this.toastr.success("Ogłoszenie zostało usunięte", "Sukces!");
      this.close();
      this.router.navigate(["home"]);
    }, error => {
      $('#modalId').modal('hide');
      this.toastr.error("Nie udało się usunąć ogłoszenia", "Error!");
    });
  }
}

