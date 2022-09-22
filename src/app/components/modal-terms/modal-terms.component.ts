import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-terms',
  templateUrl: './modal-terms.component.html',
  styleUrls: ['./modal-terms.component.scss'],
})
export class ModalTermsComponent {

  constructor(private modalController: ModalController) { }

  close(selected) {
    this.modalController.dismiss({ selected });
  }
}
