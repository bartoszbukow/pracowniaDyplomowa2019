import { Injectable, ComponentFactoryResolver, ComponentFactory, ApplicationRef, Type } from '@angular/core';
import { ModalContainerComponent } from './../components/modals/modal-container/modal-container.component';
import { Modal } from './../models/modal.model';
import { ModalRef } from './../models/modal-ref.model';
import { SafeHtml } from '@angular/platform-browser';
declare let $: any;

@Injectable()
export class ModalService {

  private modalContainer: HTMLElement;
  private modalContainerFactory: ComponentFactory<ModalContainerComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {
    this.setupModalContainerFactory();
  }

  open<T extends Modal>(component: Type<T>, inputs?: any): ModalRef {
    this.setupModalContainerDiv();

    const modalContainerRef = this.appRef.bootstrap(this.modalContainerFactory, this.modalContainer);

    const modalComponentRef = modalContainerRef.instance.createModal(component);

    if (inputs) {
      modalComponentRef.instance.onInjectInputs(inputs);
    }

    const modalRef = new ModalRef(modalContainerRef, modalComponentRef);

    if ($('#modalId')) {
      $('#modalId').modal('show');
    }

    if ($('#confirmations')) {
      $('#confirmations').modal('show');
    }

    return modalRef;
  }

  private setupModalContainerDiv(): void {
    this.modalContainer = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(this.modalContainer);
  }

  private setupModalContainerFactory(): void {
    this.modalContainerFactory = this.componentFactoryResolver.resolveComponentFactory(ModalContainerComponent);
  }

  createContentConfirmationModal(icon?: string, title?: string, bodyText?: string | SafeHtml, functionName?: string, buttonName?: string, buttonColor: string = 'primary') {
    let modalData = {
      icon: icon,
      title: title,
      bodyText: bodyText,
      functionName: functionName,
      buttonName: buttonName,
      buttonColor: buttonColor
    }
    return modalData;
  }
}
