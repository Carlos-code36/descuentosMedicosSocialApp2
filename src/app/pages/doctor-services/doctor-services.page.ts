import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { Globals } from '@app/globals';
import { DoctorService, SessionStorageService, UtilitiesService } from '@app/services';

@Component({
  selector: 'app-doctor-services',
  templateUrl: './doctor-services.page.html',
  styleUrls: ['./doctor-services.page.scss']
})
export class DoctorServicesPage implements OnInit {

  constructor() {}
   
  ngOnInit() {
    let links = document.querySelectorAll('.link__page');
    let buble = document.querySelector('.buble') as HTMLElement;

    links.forEach(el => {
      el.addEventListener('click', (e) => {
        document.querySelector('.link__page.active').classList.remove('active')
        el.classList.add('active');

        buble.style.left = `${el['offsetLeft'] + 42}px`
      })
    })
  }


  // async getDataServicesDoctor() {
  //   this.services = await this._doctorService.getFullDataDoctor(this._globals.USER_OBJECT['idMedico']);
  //   console.log(this.services);
    
  // }

  // showSchedules(service, cardRef: HTMLElement, buttonRef) {
  //   if (buttonRef.name == 'chevron-up') {
  //     buttonRef.name = 'chevron-down';
  //     this.render.removeClass(cardRef, 'visible');
  //   } else {
  //     buttonRef.name = 'chevron-up';
  //     this.render.addClass(cardRef, 'visible');
  //   }
  // }

  // // async selectService(service) {
  // //   console.log(service);
  // //   this.selectedService = service;
  // // }
  
  // async reprogramAppointment(appoinment) //reprogramar cita 
  // {
  //   let output = await this._utilitiesService.showConfirmDialog('Reprogramar cita', '¿Esta seguro que desea cancelar y reprogramar su cita?')
  //   output && this.reprogram(appoinment)
  // }
  // async cancelAppointment(appoinment) //cancelar cita
  //  {
  //   let res = await this._utilitiesService.showConfirmDialog('Cancelar cita', '¿Esta seguro que desea cancelar su cita?')
  //   let out = res && this._doctorService.cancelAppointment(appoinment['idCitasmedicasactivas']);
  //   out && this.getDataServicesDoctor();
  // }
  // reprogram(appoinment) {
  //   this._utilitiesService.showLoader();
  //   this._doctorService.reprogramAppointment(appoinment['idCitasmedicasactivas']).then(
  //     (res: any) => {
  //       this.getDataServicesDoctor();
  //     }
  //   ).catch(
  //     (err) => {
  //       this._utilitiesService.showToast(err.error.message);
  //     }
  //   )
    
  // }
  // select(){
  //   this.estado = 'inicio';  }
}
