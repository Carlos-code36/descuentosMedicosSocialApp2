import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss'],
})
export class ModalConfirmationComponent {
  title: string;
  message: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
  ) {
    this.title = this.navParams.get('title');
    this.message = this.navParams.get('message');
  }

  close() {
    this.modalController.dismiss();
  }

  confirm(confirmation: boolean) {
    this.modalController.dismiss(confirmation);
  }
}
