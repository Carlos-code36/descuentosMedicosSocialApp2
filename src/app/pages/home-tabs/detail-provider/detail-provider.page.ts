import { translateEnterTransition, translateLeaveTransition } from '@app/animations/transitions';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalDetailDoctorComponent } from '@components/modal-detail-doctor/modal-detail-doctor.component';
import { AvatarProviderComponent } from '@components/avatar-provider/avatar-provider.component';
import { FullScreenSlidePage } from '@components/full-screen-slide/full-screen-slide.page';

import { IonContent } from '@ionic/angular';

import { PublicationsService, UserService, UtilitiesService } from '@app/services';
import { Globals } from '@app/globals';
import { ModalDetailServicesComponent } from '../../../components/modal-detail-services/modal-detail-services.component';

@Component({
  selector: 'app-detail-provider',
  templateUrl: './detail-provider.page.html',
  styleUrls: ['./detail-provider.page.scss'],
})
export class DetailProviderPage {
  @ViewChild('data__provider') data__provider: ElementRef;
  @ViewChild(AvatarProviderComponent) avatarProvider;
  @ViewChild('slideTabs') slideTabs: IonSlides;
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('slidersI') slidersI: IonSlides;

  segmentsTabsList = 
  [ 
  {label:'info+', icon:'info', color: '#ffffff'},
  {label:'galeria', icon: 'images', color: '#ffffff'}, 
  {label:'servicios', icon: 'list-alt', color: '#ffffff'},
  {label: 'medicos', icon: 'user-md', color: '#ffffff'},
  {label: 'sucursales',  icon: 'hospital', color: '#ffffff'}];

  branchsProvider: Array<string>;
  doctorsProvider: Array<string>;
  selectedTab: string;
  idProvider: number;
  providerData: any;
  fotos:Array<any> = [];

  listPublications: Array<any> = [];
  filteredPublications: Array<any> = [];
  infoServicio: any;
  idMunicipio: any;
  idServicio: any;
  nombreSubServicio: any;
  slideOpts = {
    initialSlide: 0,
    speed: 600,
    autoplay: true,
  };

  tipo;
  tempVideo;

  scrollPosition: number = 0;

  constructor(
    private _publicationsService: PublicationsService,
    private _utilitiesService: UtilitiesService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private renderer: Renderer2,
    private router: Router,
    public _globals: Globals
  ) {
    this.selectedTab = this.segmentsTabsList[0]['label'];

    this.idProvider = this.activatedRoute.snapshot.params.id_provider;
    this.idMunicipio = this.activatedRoute.snapshot.params.id_municipio;
    this.idServicio = this.activatedRoute.snapshot.params.id_servicio;
    this._publicationsService.getServiceById(this.idServicio).then(res => {
      let imagenes = res.subServicios.map(res => res.imagenes);
      let servicios = res.subServicios
      this.fotos = servicios;
    })
    this._publicationsService.getMemberDataById(this.idProvider).then(res => {
      this.providerData = res;
      //this.fotos = res.fotos;
      // if (this.providerData.tipoEmpresa.toLowerCase() != 'ips') this.segmentsTabsList.push('sucursales');
      // if (this.providerData.videos) this.segmentsTabsList.splice(1, 0,'videos');
      //console.log(this.providerData);
    });
  }

  @HostListener("scroll", ['$event'])
  onScroll($event: Event) {
    this.scrollPosition = $event.target['scrollTop'];
    
    if (this.scrollPosition > 200) {
      this.renderer.setStyle(this.data__provider.nativeElement, 'top', '12px');
      // this.renderer.setStyle(this.data__provider.nativeElement, 'height', '78vh');
      // this.renderer.setStyle(this.data__provider.nativeElement, 'overflow', 'scroll');
      // this.renderer.setStyle(this.data__provider.nativeElement, 'position', 'absolute');
    } else {
      this.renderer.setStyle(this.data__provider.nativeElement, 'top', '-86px');
    }
  }

  selectSegmentTab(segmentTab, index) {
    this.slideTabs.slideTo(index);
  }

  swipeSlide(event) {
    this.slideTabs.getActiveIndex().then(i => {      
      this.selectedTab = this.segmentsTabsList[i]['label'];
      this.getDataTabs();
    });
  }

  getDataTabs() {
    switch (this.selectedTab) {
      case 'info+':
        break;
      case 'galeria':
        break;
      case 'servicios':
        this.cargarServiciosEmpresa()
        break;
      case 'medicos':
          this.getDoctors();
          break;
      case 'sucursales':
        this.getBranchs();
        break;
      default:
        this.getBranchs();
        break;
    }
  }

  async getDoctors() {
    this.doctorsProvider = await this._publicationsService.getDoctorsByProvider(this.providerData.idEmpresa);
  }

  async getBranchs() {
    this.branchsProvider = await this._publicationsService.getBranchsByProvider(this.providerData.idEmpresa);
    
  }

  async viewProfileDoctor(idMembers) {
    let dataDoctor = await this._userService.getUserByID(idMembers, 'medico');

    let modal = await this.modalController.create({
      component: ModalDetailDoctorComponent,
      cssClass: ['modal__detail', 'doctor__detail'],
      backdropDismiss: false,
      componentProps: {
        data_doctor: dataDoctor
      }
    });

    modal.present();
  }

  async viewInfoService(idServicio){

    let dataService = await this._publicationsService.getSubServicio(idServicio);
    //console.log(idServicio);
    
    let modal = await this.modalController.create({
      component: ModalDetailServicesComponent,
      cssClass: ['modal__detail', 'doctor__detail'],
      backdropDismiss: false,
      componentProps:{
        data_service: dataService,
        id_municipio: this.idMunicipio,
        id_empresa: this.infoServicio.idEmpresa,
        id_members: this.infoServicio.idMembers,
        id_especialidad: this.infoServicio.idEspecialidad,
        tipo:this.tipo
      }
    });

    modal.present();
  }

  async cargarServiciosEmpresa(){
    await this._publicationsService.getServicesByEmpresa(this.providerData.idEmpresa).then(res => {

      this.filteredPublications = res;

    })
  }

  async cargarSubServicios(index, idServicio){
    //console.log(index);
    //console.log(idServicio); 

    await this._publicationsService.getServiceById(idServicio).then(res => {
      this.infoServicio = res
      //this.listPublications = res.subServicios;
      //console.log(this.listPublications);
    })
    
    
    this._publicationsService.getServicesByEmpresa(this.providerData.idEmpresa).then(res => {
      
      this.listPublications = res[index].subServicios;
      console.log( this.listPublications );
      
    })
    /* this._publicationsService.getServiceById(idServicio).then(res => {
      
    }) */

    let altura = document.querySelector("#main > app-detail-provider > ion-content > div > div > div.data").scrollHeight;
    document.querySelector("#main > app-detail-provider > ion-content > div").scrollTo(0, altura + 200);
  }

  showSubServicio(event){
    this.router.navigate([`/home/detail-publication/${this.idServicio}/${event.idSubServicios}/${this.idMunicipio}`]);
  }

  async showPhotoAvatar(photo?) {
    
    let modal = await this.modalController.create({
      animated: true,
      componentProps: {
        // listImages: photo ? [photo] : this.getPhotoListProfile(),
        initial: 0
      },
      component: FullScreenSlidePage,
      enterAnimation: translateEnterTransition,
      leaveAnimation: translateLeaveTransition
    });

    await modal.present();

    modal.onDidDismiss().then(async () => {
      await this._utilitiesService.fullScreenOff()
    })

    this._utilitiesService.fullScreenOn().then(() => {
      setTimeout(async () => {
        await modal.present();
      }, 100);
    })
  }

  click1(event: Event) {
    let target = (event.target as HTMLElement);
    target.classList.add('s_round_click');

    let flip_box_class = target.parentElement.parentElement.parentElement.firstElementChild.classList;
    let s_arrow_class = target.classList;
    let b_round_class = target.parentElement.classList;

    flip_box_class.contains('flipped') ? flip_box_class.remove('flipped') : flip_box_class.add('flipped');
    s_arrow_class.contains('s_arrow_rotate') ? s_arrow_class.remove('s_arrow_rotate') : s_arrow_class.add('s_arrow_rotate');
    b_round_class.contains('b_round_back_hover') ? b_round_class.remove('b_round_back_hover') : b_round_class.add('b_round_back_hover');
  }

  click2(event: Event) {
    (event.target as HTMLElement).classList.add('s_round_back');
    (event.target as HTMLElement).classList.remove('s_round_click');
  }
  
  prevSlide(listado, slidersI) {
    slidersI.slidePrev(500).then(() => {
      this.checkisBeginning(listado, slidersI);
    });;
  }

  nextSlide(listado, slidersI) {
    slidersI.slideNext(500).then(() => {
      this.checkisEnd(listado, slidersI);
    });
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
      
    });
    if (object.isBeginningSlide) {
      slideView.slideTo(object.length - 1, 500);
    }
  }

  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
    if (object.isEndSlide) {
      slideView.slideTo(0, 500);
    }
  }
}
