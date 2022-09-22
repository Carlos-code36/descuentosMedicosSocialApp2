import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
    selector: 'app-modal-certificado',
    templateUrl: './modal-certificado.component.html',
    styleUrls: ['./modal-certificado.component.scss']
})
export class ModalCertificadoComponent {

    constructor( 
        private modalController: ModalController  
    ) { }

    close() {
        this.modalController.dismiss();
    }

}