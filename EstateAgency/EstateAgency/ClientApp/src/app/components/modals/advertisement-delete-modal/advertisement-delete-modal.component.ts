import { Component, OnInit, OnDestroy } from '@angular/core';
import { Modal } from './../../../models/modal.model';
import { ApiService } from '../../../services/api.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { responseNumbers } from './../../../constants/responseNumbers';
declare let $: any;

@Component({
  selector: 'app-advertisement-delete-modal',
  templateUrl: './advertisement-delete-modal.component.html',
  styleUrls: ['./advertisement-delete-modal.component.less']
})
export class AdvertisementDeleteModalComponent extends Modal implements OnInit, OnDestroy {
  advertisement: IAdvertisement;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
  }

  onInjectInputs = (inputs: any): void => {
    this.advertisement = inputs.advertisement;
  }

  ngOnInit() {
    $('#modalId').on('hidden.bs.modal', () => {
      this.dismiss('canceling');
    })
  }

  ngOnDestroy() {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  cancel = (): void => {
    this.dismiss('canceling');
  }

  removeAdvertisement = (advertisementId: string): void => {
    let data = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        id: advertisementId
      }
    }
    this.api.deleteAdvertisement(data).subscribe(res => {
      this.toastr.success(responseNumbers[112], "Sukces!");
      this.close();
      this.router.navigate(["home"]);
    }, error => {
      $('#modalId').modal('hide');
      this.toastr.error(responseNumbers[112], "Error!");
    });
  }
}

