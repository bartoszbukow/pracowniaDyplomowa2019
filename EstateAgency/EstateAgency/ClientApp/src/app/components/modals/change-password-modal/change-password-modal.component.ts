import { Component, OnInit, OnDestroy } from '@angular/core';
import { Modal } from './../../../models/modal.model';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ChangePasswordModel } from "./../../../models/userchangePassword.model";
import { responseNumbers } from './../../../constants/responseNumbers';
declare let $: any;

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.less']
})
export class ChangePasswordModalComponent extends Modal implements OnInit, OnDestroy {
  changePasswordForm: FormGroup;
  changePasswordModel: ChangePasswordModel = new ChangePasswordModel();
  user: IUserManagement;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    super();
  }

  onInjectInputs = (inputs: any): void => {
    this.user = inputs.user;
  }

  ngOnInit() {
    $('#modalId').on('hidden.bs.modal', () => {
      this.dismiss('canceling');
    })

    this.createForm();
  }

  ngOnDestroy() {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  cancel = (): void => {
    this.dismiss('canceling');
  }

  createForm = (): void => {
    this.changePasswordForm = this.fb.group({
      passwordNew: [this.changePasswordModel.passwordNew, Validators.compose([
        Validators.required,
        Validators.pattern(/\d/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[!@#$%^&*(),./]/),
        Validators.minLength(8),
      ])],

      passwordConfirm: [this.changePasswordModel.passwordConfirm, Validators.compose([
        Validators.required,
      ])],
    },
      {
        validator: this.mustMatch('passwordNew', 'passwordConfirm')
      });
  }

  mustMatch = (controlName: string, matchingControlName: string): object => {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  get f(): object {
    return this.changePasswordForm.controls;
  }

  getFormControl = (name: string): AbstractControl => {
    return this.changePasswordForm.get(name);
  }

  hasError = (name: string): boolean => {
    var e = this.getFormControl(name);
    return e.touched && !e.valid;
  }

  changePassword = () => {
    if (!this.changePasswordForm.valid) {
      return;
    }

    var tempUser = <IAdminChangeUserPassworde>{};
    tempUser.userId = this.user.id;
    tempUser.newPassword = this.changePasswordForm.value.passwordNew;

    this.api.putAdminChangeUserPassword(tempUser).subscribe(res => {
      this.toastr.success(responseNumbers[101], "Sukces!");
      this.close();
    },
      error => {
        this.changePasswordForm.setErrors({ "changePassword": responseNumbers[error.error] });
      });
  }
}

