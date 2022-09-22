import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';

// Third party libraries 
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Crop } from "@ionic-native/crop/ngx";

// Owner libraries
import { FullScreenSlidePage } from './../full-screen-slide/full-screen-slide.page';
import { UtilitiesService } from '@services/utilities.service';

import { translateEnterTransition, translateLeaveTransition } from '@app/animations/transitions';
import { GlobalDataService, BeneficiariesService } from '@app/services';
import { Globals } from '@app/globals';

const { Camera } = Plugins;

@Component({
  selector: 'avatar-user',
  templateUrl: './avatar-user.component.html',
  styleUrls: ['./avatar-user.component.scss'],
})
export class AvatarUserComponent {

  @Input() pet;
  @Input() user;
  @Input() admin;
  @Input() doctor;
  @Input() provider;
  @Input() preview = true;
  @Input() modeEdit: boolean;
  @Input() beneficiary: Object = {};
  @Input() canEdit: boolean = false;

  @Output() loadAvatar = new EventEmitter<any>();
  @Output() loadCoverpage = new EventEmitter<any>();
  @Output() changedData = new EventEmitter<boolean>();

  dataUser: any;

  coverPage: string;
  profile: string;

  imageViewerCoverpage: any;
  imageViewerProfile: any;
  imageFileCoverpage: any;
  imageFileProfile: any;
  image;

  petProfile: any;
  petCoverpage: any;

  pets: Array<any> = []

  constructor(
    public actionSheetController: ActionSheetController,
    private _globalDataService: GlobalDataService,
    private _utilitiesService: UtilitiesService,
    private modalController: ModalController,
    private crop: Crop,
    private _beneficiariesService: BeneficiariesService,
    private _globals: Globals

  ) {

    this.getMascotas() 

  }

  getPhotoCoverPage() {
    return this.user.fotos.find(dt => dt.favorita == 1 && dt.tipo == 'portada') || undefined;
  }

  getPhotoProfile() {
    return this.user.fotos.find(dt => dt.favorita == 1 && dt.tipo == 'avatar') || undefined;
  }

  getPhotoListCoverPage() {
    let listCover: [] = (this.user || this.beneficiary).fotos.filter(dt => dt.tipo == 'portada');
    return listCover.length == 0 ? [{ path: 'background_default.jpeg' }] : listCover;
  }

  getPhotoListProfile() {
    return (this.user || this.beneficiary).fotos.filter(dt => dt.tipo == 'avatar') || undefined;
  }

  async loadImage(typePhoto: string) {
    const actionSheet = await this.actionSheetController.create({
      header: `Actualizar ${typePhoto == 'cover' ? 'imagen de portada' : 'avatar'}`,
      buttons: [
        {
          text: 'Cargar desde galería',
          handler: () => this.getPicture(typePhoto, CameraSource.Photos)
        },
        {
          text: 'Tomar desde la camara',
          handler: () => this.getPicture(typePhoto, CameraSource.Camera)
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  getPicture(type: string, sourceType) {
    Camera.getPhoto({
      quality: 100,
      width: 800,
      height: 800,
      preserveAspectRatio: true,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: sourceType,
      saveToGallery: false
    }).then(imageData => {
      return this.crop.crop(imageData.path, { quality: 100 })
    }).then(croppedImage => {
      if (type === 'profile') {
        this.imageViewerProfile = (<any>window).Ionic.WebView.convertFileSrc(croppedImage.split('?')[0]);
        this.imageFileProfile = croppedImage;
        this.loadAvatar.emit(this.imageFileProfile);
      } else {
        this.imageViewerCoverpage = (<any>window).Ionic.WebView.convertFileSrc(croppedImage.split('?')[0]);
        this.imageFileCoverpage = croppedImage;
        this.loadCoverpage.emit(this.imageFileCoverpage);
      }
    }).catch(err => {
      this._utilitiesService.showToast('Error inesperado, no se puede acceder a la camara.');
    })
  }

  async showPhotoAvatar(photo?) {
    let toShow = this.doctor ? [this.getPhotoProfile()] : this.getPhotoListProfile()
    
    let modal = await this.modalController.create({
      animated: true,
      componentProps: {
        listImages: photo ? [this.getPhotoProfile()] : toShow,
        canEdit: this.canEdit,
        initial: 0
      },
      component: FullScreenSlidePage,
      enterAnimation: translateEnterTransition,
      leaveAnimation: translateLeaveTransition
    });

    await modal.present();

    modal.onDidDismiss().then(async (e?) => {
      this.changedData.emit(e.data)
      await this._utilitiesService.fullScreenOff()
    })

    this._utilitiesService.fullScreenOn().then(() => {
      setTimeout(async () => {
        await modal.present();
      }, 100);
    })
  }

  async showPhotoCoverPage(photo?) {
    let toShow = this.doctor ? [this.getPhotoCoverPage()] : this.getPhotoListCoverPage()

    let modal = await this.modalController.create({
      animated: true,
      componentProps: {
        listImages: photo ? [this.getPhotoCoverPage()] : toShow,
        canEdit: this.canEdit,
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

  // savePhoto() {
  //   let namePhoto = `profile_img_user_${this.dataUser.idUsuarios}_${new Date().getTime()}.jpg`;
  //   let endPointProfile = `avataruser/${this.dataUser.idMembers}/avatar/1`;
  //   let endPointCoverPage = `avataruser/${this.dataUser.idMembers}/portada/1`;

  //   setTimeout(() => {
  //     if (this.imageFileProfile) {
  //       this._utilitiesService.uploadImage(this.imageFileProfile, namePhoto, endPointProfile, this.admin).then(() => {
  //         this.getDataUser();
  //         this.profile = this.imageViewerProfile;
  //         this.imageViewerProfile = undefined;
  //         this.imageFileProfile = undefined;
  //       })
  //     };

  //     if (this.imageFileCoverpage) {
  //       this._utilitiesService.uploadImage(this.imageFileCoverpage, namePhoto, endPointCoverPage, this.admin).then(() => {
  //         this.getDataUser();
  //         this.imageViewerCoverpage = undefined;
  //         this.imageFileCoverpage = undefined;
  //       })
  //     };

  //     this.router.navigate(['preview-profile']);
  //   }, 1000);

  // }

  async ngOnDestroy() {
    this.imageFileCoverpage = undefined;
    this.imageFileProfile = undefined;
    this._globalDataService.getUserLogged(true).then();
  }

  async getMascotas() {
    this._beneficiariesService.getDataGroup(this._globals.GROUP['idGrupos']).subscribe(res => {
      this.pets = res.mascotas;
      this.pruebaFind(this.pets)
    });
  }

  async pruebaFind(pets) {
    for (let i = 0; i < this.pets.length; i++) {
      if (this.pets[i].idMascotas == this.user) {
        this.petProfile = this.pets[i].avatar;
        this.petCoverpage = this.pets[i].portada;
      }
    }
  }
}
