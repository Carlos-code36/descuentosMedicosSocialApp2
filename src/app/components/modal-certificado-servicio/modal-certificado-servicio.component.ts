import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
    selector: 'app-modal-certificado-servicio',
    templateUrl: './modal-certificado-servicio.component.html',
    styleUrls: ['./modal-certificado-servicio.component.scss']
})
export class ModalCertificadoServicioComponent {

    constructor( 
        private modalController: ModalController  
    ) { }

    close() {
       console.log('Modal close');
       
        this.modalController.dismiss();
    }

}