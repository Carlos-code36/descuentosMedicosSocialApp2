import { ModalProductsComponent } from './../../components/modal-products/modal-products.component';
import { ModalTemplateComponent } from './../../components/modal-template/modal-template.component';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '@app/globals';

import { AuthService } from '@app/services';
import { ModalController } from '@ionic/angular';
import { visibility } from 'html2canvas/dist/types/css/property-descriptors/visibility';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('toggle') toggle;

  slideData = [
    { rute: '/assets/img/slides/banner1a.png' },
    { rute: '/assets/img/slides/banner2a.png' },
    { rute: '/assets/img/slides/banner3a.png' }
  ]

  itemsMenu = [
    //{ label: 'beneficiarios', icon: 'heartbeat', path: '/beneficiaries-tabs' },
    { label: 'beneficiarios', icon: 'heartbeat', path: '/beneficiaries-tabs', color: '#FF4141' },
    // { label: 'peluditos', icon: 'paw', path: '/pets' },
    // { label: 'beneficiarios', icon: 'heartbeat', path: '/preview-profile' },
    // { label: 'mascotas', icon: 'paw', path: '/groups_beneficiaries/pets' },
    { label: 'mis citas', icon: 'clock', path: '/appointments/my-appointments', color: '#FFA14A' },
    { label: 'citas peluditos', icon: 'paw', path: '/appointments/pets-appointments' , color: '#F8F8F8'},
    { label: 'promociones', icon: 'star', path: '/home/promociones', color: '#DBFF00' },
    //{ label: 'recordatorio medicamentos', icon: 'calendar-alt', path: '/reminder' },
    // { label: 'publicaciones médicas', icon: 'hospital-user', path: '/publications' },
    // { label: 'recetario', icon: 'capsules', path: '/prescriptions' },
    // { label: 'preguntale al dr.', icon: 'comment-medical', path: '/askdoctor' },
    // { label: 'favoritos', icon: 'star', path: '/favorites' },
    // { label: 'historial de citas', icon: 'notes-medical', path: '/history_appoinments' },
    // { label: 'historial de citas', icon: 'notes-medical', path: '/appointments/appoinments-history/456' },
    // { label: '**', icon: 'question', path: '/login' },
    { label: 'contacto prevenir', icon: 'headset', path: '/contact', color: '#058DD9' },
    { label: 'pagos', icon: 'wallet', path: '/contact', color: '#00AB78' },

  ]

  constructor(
    private modalController: ModalController,
    private _authService: AuthService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    public _globals: Globals,
    private router: Router,
  ) {
    // this._globals.USER_TYPE == 'medico' && this.itemsMenu.unshift({ label: 'Mi agenda', icon: 'calendar-alt', path: `/home` });    

    this.renderer.listen(this.elRef.nativeElement, 'click', (e) => {
      let el = e.target.closest('.item__link') as HTMLElement
      if (el !== null) this.router.navigate([el.getAttribute('data-path')]);
    })
  }

  ngAfterViewInit() {
    console.log(this._globals.USER_TYPE);
    setTimeout(() => {
      this._globals.USER_TYPE == 'medico' && this.itemsMenu.unshift({ label: 'Mi agenda', icon: 'calendar-alt', path: `/doctor-services`, color: '#0AAACD' });
    }, 2000);
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // console.log(prefersDark);

    // this.checkToggle(prefersDark)
    // prefersDark.addEventListener('change', e => this.checkToggle(e));
  }

  async showProducts() {
    let modal = await this.modalController.create({
      component: ModalProductsComponent,
      cssClass: 'modal__template'
    })

    // let modal = await this.modalController.create({
    //   component: ModalProductsComponent,
    //   cssClass: 'modal__template'
    // })

    modal.present()
  }

  logout() {
    this._authService.logout();
  }

  changeThemeMode(ev) {
    document.body.classList.toggle('dark', ev.detail.checked);
  }

  checkToggle(shouldCheck) {
    console.log(shouldCheck.matches);
    this.toggle.checked = shouldCheck.matches;
  }
}
