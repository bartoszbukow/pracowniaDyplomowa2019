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

  addReservation = () => {
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

