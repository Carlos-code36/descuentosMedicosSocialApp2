import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-products',
  templateUrl: './about-products.page.html',
  styleUrls: ['./about-products.page.scss'],
})
export class AboutProductsPage {

  constructor(
    private modalController: ModalController
  ) { }

  close() {
    this.modalController.dismiss()
  }

}
