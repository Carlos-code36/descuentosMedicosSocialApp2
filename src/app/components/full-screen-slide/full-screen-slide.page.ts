import { UserService } from '@app/services';
import { UtilitiesService } from './../../services/utilities.service';
import { Component, ViewChild, Injector } from '@angular/core';
import { IonSlides, ModalController, NavParams } from '@ionic/angular';
import { Globals } from '@app/globals';

@Component({
  selector: 'app-full-screen-slide',
  templateUrl: './full-screen-slide.page.html',
  styleUrls: ['./full-screen-slide.page.scss'],
})
export class FullScreenSlidePage {
  @ViewChild('slides') slides: IonSlides;
  @ViewChild('slideThumbnails') slideThumbnails: IonSlides;

  canEdit = false;
  idMember: any;

  imageList = [];
  mainSlideOpts = {
    centeredSlides: true,
    slidesPerView: 1,
  };

  slideOpts = {
    centeredSlides: true,
    slidesPerView: 5,
    spaceBetween: 5,
  };
  position = 1;
  data;

  constructor(
    private injector: Injector,
    private navParams: NavParams,
    private _userService: UserService,
    private modalController: ModalController,
    private _globals: Globals
  ) {
    this.idMember = _globals.USER_ID;
    //console.log(this.idMember);
    
   }

  public get _utilitiesService(): UtilitiesService {
    return this.injector.get(UtilitiesService);
  }

  ionViewWillEnter() {
    this.canEdit = this.navParams.data.canEdit;
    this.position = this.navParams.data.initial;
    this.imageList = this.navParams.data.listImages;
    this.position = this.imageList.findIndex(e => e.favorita == 1);
  }

  ionViewDidEnter() {
    if (this.imageList.length == 1 && this.navParams.data.canEdit) {
      let image = this.imageList[0].path
      this.canEdit = !(image == '358-4244977468.jpg' || image == 'background_default.jpeg' || 'avatarundefined.png');
    }

    this.slides.slideTo(this.position)
    this.slideThumbnails.slideTo(this.position);
  }

  async slided() {
    this.position = await this.slides.getActiveIndex();
    this.slideThumbnails.slideTo(this.position);
  }

  async deleteImage(photo) {
    //console.log(photo);

    if (photo.idMembers == this.idMember) {
      let res = await this._utilitiesService.showConfirmDialog('Eliminar', '¿Seguro que deseas eliminar la foto?', 'Eliminar', 'Cancelar').then(rs => rs);
      res && this._userService.deletePhoto(photo).then(() => this.close());
    }else{
      let res = await this._utilitiesService.showConfirmDialog('Error', 'No tiene permitido eliminar esta foto.', 'Aceptar').then(rs => rs);
    }
    
  }

  async setDefaultImage(photo) {
    let res = await this._utilitiesService.showConfirmDialog('Información', '¿Deseas seleccionar como foto de perfíl predeterminada?', 'Cambiar', 'Cancelar').then(rs => rs);
    res && this._userService.setFavoritePhoto(photo).then(() => this.close());
  }

  setView(index) {
    this.slides.slideTo(index);
  }

  async close() {
    await this.modalController.dismiss();
  }

}
