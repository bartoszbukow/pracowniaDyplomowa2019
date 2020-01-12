import { Component, OnInit, OnDestroy } from '@angular/core';
import { Modal } from './../../../models/modal.model';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { responseNumbers } from './../../../constants/responseNumbers';
declare let $: any;

@Component({
  selector: 'app-reservation-create-modal',
  templateUrl: './reservation-create-modal.component.html',
  styleUrls: ['./reservation-create-modal.component.less']
})
export class ReservationCreateModalComponent extends Modal implements OnInit, OnDestroy {
  advertisement: IAdvertisement;

  constructor(
    private api: ApiService,
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

  addReservation = (): void => {
    var tempReservation = <IReservation>{};
    tempReservation.id = this.advertisement.id;

    this.api.postReservationCreate(tempReservation).subscribe(res => {
      this.toastr.success(responseNumbers[114], "Sukces!");
      this.close();
    }, error => {
      $('#modalId').modal('hide');
      this.toastr.error(responseNumbers[115], "Error!");
    });
  }
}

