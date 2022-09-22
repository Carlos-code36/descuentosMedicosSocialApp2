import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PublicationsService, UtilitiesService } from '@app/services';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { PublicationsPage } from '../publications/publications.page';
import { ModalCertificadoServicioComponent } from '../../../components/modal-certificado-servicio/modal-certificado-servicio.component';
import { SlidePublicityComponent } from '@app/components/slide-publicity/slide-publicity.component';

@Component({
  selector: 'app-detail-publication',
  templateUrl: './detail-publication.page.html',
  styleUrls: ['./detail-publication.page.scss'],
})
export class DetailPublicationPage {
  providerData: any;
  providerData2: any;

  subServicios: any;
  idMunicipio: any;
  publicationId: any;
  idSubservicio: any;
  listPublications: Array<any> = [];
  filteredPublications: Array<any> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _publicationsService: PublicationsService,
    private modalController: ModalController,
    private _utilitiesService: UtilitiesService,
    private actionsheetCtrl: ActionSheetController,

  ) {
    this.publicationId = this.activatedRoute.snapshot.params.id_publication;
    this.idSubservicio = this.activatedRoute.snapshot.params.id_subservicio;
    this.idMunicipio = this.activatedRoute.snapshot.params.id_municipio;
    /* console.log(this.publicationId);
    console.log(this.idSubservicio);
    console.log(this.idMunicipio); */
    

    this._publicationsService.getSubServicio(this.idSubservicio).then(res => {
      this.subServicios = res;
      //console.log(res);
    })
    this._publicationsService.getServiceById(this.publicationId).then(res => {
      this.providerData = res;
      console.log('Util',this.providerData);
    });
    //this.getSubServicios(this.publicationId)
    
    
    this.mostrarCertificado()
    // this.consulta();
  }

  certificadoActivado(){
  }

  async mostrarCertificado(){
    let modal = await this.modalController.create({
      component: ModalCertificadoServicioComponent,
      cssClass: 'modal__template'
    })
    modal.present();
  }

  /* getSubServicios(idServicio){
    this._publicationsService.getServiceById(idServicio).then(res => {
      //console.log(res);
      
      this.listPublications = res
      this.filteredPublications = res.subServicios;
      //console.log(this.filteredPublications);
      this.getPosicionSubServicio()
    })
  }

  getPosicionSubServicio(){
    for (let i = 0; i < this.filteredPublications.length; i++) {
      if (this.publicationId == this.filteredPublications[i].idSubServicios) {
        this.subServicios = this.filteredPublications[i];
        this.idSubservicio = this.filteredPublications[i].idSubServicios;
        //console.log(this.idSubservicio);
        
      }
    }
  }

  detailPublication(event, idService) {
    let parent = event.target.closest('.keywords__publication');
    if (parent) return;

    this.router.navigate([`/home/detail-publication/${idService}/${this.idMunicipio}`]);
  } */
  

  cambiarVista(){
    const promesa =new Promise(resolve => {
      resolve(this._publicationsService.getMemberDataById(this.providerData.idMembers).then(res => {
        this.providerData2 = res;
        console.log(this.providerData2); 
        // console.log(res);
      }))
    });

    promesa.then(res => {
     

    if(this.providerData.idEspecialidad == 15||this.providerData.idEspecialidad == 28){
      this._utilitiesService.showInfoDialog('Información Para Cita', 'Empresa:' + this.providerData2.nombre + '<br>'+
      '<br>' + 'Direccion:' + this.providerData2.direccion + '<br>' +
      '<br>' + 'Telefono: ' + this.providerData2.telefono + '<br>'+
      '<br>' + 'Telefono Fijo: ' + this.providerData2.telefonoFijo + '<br>'+
      '<br>' + 'Correo: ' + this.providerData2.correo + '<br>'+
      '<br>' + '<a href="'+this.providerData2.linkWhatsapp+'"><ion-icon name=logo-whatsapp item-end small></ion-icon></a> '
      );
          // <a href="'+this.providerData2.linkFacebook+'"><ion-icon name=logo-facebook></ion-icon></a> <a href="'+this.providerData2.linkInstagram+'"><ion-icon name=logo-instagram></ion-icon></a>

      console.log(this.providerData2.linkWhatsapp);
    } 
    else {
      // [routerLink]="['/appointments/new-appoinment/'+idMunicipio+'_'+providerData['idServicios']+'_'+providerData['idEmpresa']+'_'+providerData['idMembers']+'_'+providerData['idEspecialidad']+'/0'+'/0'+'/'+idSubservicio]"
      this.router.navigate([`/appointments/new-appoinment/${this.idMunicipio}_${this.providerData.idServicios}_${this.providerData.idEmpresa}_${this.providerData.idMembers}_${this.providerData.idEspecialidad}/0/0/${this.idSubservicio}`]);
    }
    });

  } 
}
