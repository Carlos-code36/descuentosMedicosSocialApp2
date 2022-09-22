import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { ModalProductsComponent } from '@components/modal-products/modal-products.component';

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.scss'],
})
export class ModalTemplateComponent {
  @ViewChild('modal__content') modal__content: ElementRef;

  htmlTemplate: boolean = false;
  showClose: boolean = true;
  componentContent: any;
  contentBody: string;
  validate: any;
  title: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private renderer: Renderer2
  ) {
    this.componentContent = this.navParams.get('componentContent');
    this.htmlTemplate = this.navParams.get('htmlTemplate');
    this.showClose = this.navParams.get('showClose');

    this.title = navParams.get('title');
    this.contentBody = this.navParams.get('body');
    this.validate = this.navParams.get('data') ? this.navParams.get('data')['validate'] : false;
  }

  ngAfterViewInit() {
    if (!this.htmlTemplate) return

    let content = new DOMParser().parseFromString(this.contentBody, 'text/html').body.firstChild;
    console.log(content);

    this.renderer.appendChild(this.modal__content.nativeElement, content);
  }

  async close() {
    this.modalController.dismiss({ data: 123 });
  }

  async openModalValidate() {
    this.modalController.create({
      component: ModalProductsComponent,
      cssClass: 'modal__data',
      swipeToClose: false,
      componentProps: {
        
      }
    }).then((modal) => modal.present());
  }
}
