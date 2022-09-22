import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-products',
  templateUrl: './modal-products.component.html',
  styleUrls: ['./modal-products.component.scss'],
})
export class ModalProductsComponent {

  constructor(
    private modalController: ModalController
  ) { }

  close() {
    this.modalController.dismiss();
  }
}
