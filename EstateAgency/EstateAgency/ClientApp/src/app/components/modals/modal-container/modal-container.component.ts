import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, Type, ComponentRef } from '@angular/core';
import { Modal } from './../../../models/modal.model';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.less']
})

export class ModalContainerComponent {

  @ViewChild('modalContainer', { read: ViewContainerRef, static: false }) private modalContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  createModal<T extends Modal>(component: Type<T>): ComponentRef<T> {
    this.modalContainer.clear();
    const factory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory(component);
    return this.modalContainer.createComponent(factory, 0);
  }
}
