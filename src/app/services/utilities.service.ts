import { Injectable, Injector, Renderer2, RendererFactory2 } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController, Platform } from '@ionic/angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Screenshot } from "@ionic-native/screenshot/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { AndroidFullScreen } from "@ionic-native/android-full-screen/ngx";
import { BehaviorSubject } from 'rxjs';

import CryptoJS from "crypto-js";

// Onwer Libreries
import { ModalTemplateComponent } from '@components/modal-template/modal-template.component';
import { FullScreenSlidePage } from '@components/full-screen-slide/full-screen-slide.page';
import { translateEnterTransition, translateLeaveTransition } from '@app/animations/transitions';

import { environment } from 'src/environments/environment';
import { Capacitor } from '@capacitor/core';
import * as rasterizeHTML from 'rasterizehtml';
import { File as ioFile } from '@ionic-native/file/ngx';
import { Downloader } from '@ionic-native/downloader/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public renderer: Renderer2;
  public onLoading = new BehaviorSubject(false);
  loader;
  screen: any;
  state: boolean = false;

  fileTransfer: FileTransferObject;

  constructor(
    private injector: Injector,
    private rendererFactory: RendererFactory2,
    private downloader: Downloader,
    private transfer: FileTransfer,
    private screenshot: Screenshot,
    private socialSharing: SocialSharing,
    private platform: Platform,
    private alertController: AlertController,
    private toastController: ToastController,
    private androidFullScreen: AndroidFullScreen,
    private loadingController: LoadingController,
    private file: ioFile
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public get modalController(): ModalController {
    return this.injector.get(ModalController);
  }

  /**
   * Método que recibe un string y lo retorna un string con encriptación SHA512.
   * @param entry Cadena string para encriptar.
   */
  encrypt(entry: string) {
    return CryptoJS.SHA512(entry, environment.secret_key).toString(CryptoJS.enc.Hex);
  }

  /**
   * 
   * @param header String con el titulo a mostrar.
   * @param message String con el mensaje a mostrar.
   * @param textConfirm String con el texto a mostar en el boton de confirmación. Por defecto se muestra "Aceptar".
   * @param textCancel String con el texto a mostar en el boton de cancelar. Por defecto se muestra "C".
   */
  showInfoDialog(header: string, message: string, showCancel: boolean = false, textConfirm?: string, textCancel?: string) {
    return new Promise((resolve, reject) => {
      this.alertController.create({
        cssClass: 'custom__alert',
        header: header || 'Header title',
        message: message || 'Text content body',
        buttons: [
          { text: textConfirm || 'Aceptar', role: 'confirm', handler: () => { return resolve(false) } },
          showCancel && { text: textCancel || 'Cancelar', role: 'cancel', handler: () => { return resolve(true) } }
        ]
      }).then(alert => {
        alert.present()
      });
    })
  }

  /**
   * 
   * @param header Titulo del dialogo de confirmación a mostrar.
   * @param message Mensaje para mostrar como contenido.
   * @param textConfirm Texto para mostrar en el boton de confimación.
   * @param textCancel Texto para mostrar en el boton de cancelar.
   */
  showConfirmDialog(header: string, message: string, textConfirm?: string, textCancel?: string) {
    return new Promise((resolve, reject) => {
      this.alertController.create({
        cssClass: 'custom__alert',
        header: header || 'Header title',
        backdropDismiss: false,
        message: message || 'Text content body',
        buttons: [
          {
            text: textCancel || 'Volver',
            role: 'cancel',
            handler: () => { return resolve(false) }
          }, {
            text: textConfirm || 'Sí, seguro',
            role: 'confirm',
            cssClass: 'confirm',
            handler: () => { return resolve(true) }
          }
        ]
      }).then(alert => alert.present());
    });
  }
  
  /**
   * 
   * @param title Titulo de dialogo para ingresar un valor
   * @param message  Mensaje para mostrar 
   * @param showCancel boolean para mostrar o no el boton de cancelar
   * @param textConfirm  Texto para mostrar en el boton de confirmación.
   * @param textCancel  Texto para mostrar en el boton de cancelar.
   * @returns Retorna una promesa con el valor ingresado.
   */
  showEnterDialog(title: string, message: string, showCancel: boolean = true, textConfirm?: string, textCancel?: string) {
    return new Promise((resolve, reject) => {
      this.alertController.create({
        cssClass: 'custom__alert',
        header: title || 'Header title',
        message: message || 'Text content body',
        inputs: [
          {
            name: 'motivo',
            type: 'text',
            placeholder: 'Motivo de la cancelación'
          }],
        buttons: [
          { text: textConfirm || 'Aceptar',
          role: 'confirm', 
          handler:data=> {
          console.log(JSON.stringify(data)); // dato ingresado en el input
          resolve(data.motivo);
        } },
          showCancel && { text: textCancel || 'Cancelar', 
          role: 'cancel', 
          handler: () => { return resolve('') } }
        ]
      }).then(alert => alert.present());
    })
  }

  /**
   * Método para lanzar el modal con un contenido dinámico establecido por los parámetros.
   * @param title Cadena de texto con el título del modal.
   * @param body Cadena de texto con el contenido o cuerpo del modal
   * @param showClose Boolean para mostrar o no el boton con "X" para cerrar el modal.
   * @param validate Boolean para mostrar o no el modal de validación de correo
   */
  async showModalTemplate(title: string = 'Default title', body: string = 'Content body default', showClose: boolean = true, data?: Object) {
    const modal = await this.modalController.create({
      component: ModalTemplateComponent,
      cssClass: 'modal__template',
      swipeToClose: false,
      componentProps: {
        showClose,
        title,
        data,
        body
      }
    });

    modal.present();
  }


  /**
   * Método para lanzar mensaje tipo toast.
   * @param message Mensaje para mostrar en el toast. 
   * @param duration Duración en ms del mensaje toast a mostrar
   */
  showToast(message: string, duration: number = 2000) {
    this.toastController.create({
      message,
      duration
    }).then(toast => toast.present())
  }

  /**
   * Método para mostrar elemento de carga o loader.
   * @param message Mensaje para mostrar junto con el loader.
   */
  async showLoader(message?) {
    this.onLoading.next(true);

    this.loader = await this.loadingController.create({
      spinner: null,
      cssClass: 'loader',
      message: `<div class="pulse"></div>
                <div class="message">${message || 'Cargando...'}</div>`,
    }).then(loader => {
      loader.present().then(async () => {
        if (!await this.onLoading.toPromise()) {
          loader.dismiss();
        }
      })
    });
  }

  /**
   * Método para ocultar el loader.
   */
  closeLoader() {
    setTimeout(async () => {
      await this.loadingController.dismiss();

      if (this.onLoading) {
        await this.loadingController.dismiss();
        this.onLoading.next(false);
      }
    }, 500);
  }

  showLoaderInput(el: HTMLElement) {
    this.renderer.addClass(el, 'load');
  }

  hideLoaderInput(el: HTMLElement) {
    this.renderer.removeClass(el, 'load');
  }

  /**
   * Método para subi runa imagen a la Api.
   * @param file Archivo imagen para guardar.
   * @param name Nombre para guardar al imagen.
   * @param endPoint url parcial del servicio.
   */
  async uploadImage(file, name: string, endPoint: string, adminAccount?: boolean) {
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'imagen',
      fileName: name,
      httpMethod: 'PUT'
    }

    console.log(file, options);


    fileTransfer.upload(file, `${environment.apiUrl}/${endPoint}`, options).then()
  }

  /**
   * Método para visualizar imagenes en un slider a pantalla completa.
   * @param listImages LIstado de imagenes para mostrar
   */
  public async showFullViewSlide(listImages: []) {
    console.log(listImages);

    let modal = await this.modalController.create({
      animated: true,
      component: FullScreenSlidePage,
      enterAnimation: translateEnterTransition,
      leaveAnimation: translateLeaveTransition
    });

    modal.onDidDismiss().then(async () => {
      await this.fullScreenOff()
    })

    this.fullScreenOn().then(() => {
      setTimeout(async () => {
        await modal.present();
      }, 100);
    })
  }

  /**
   * Método para mostrar en pantalla completa en la app.
   */
  async fullScreenOn() {
    await this.androidFullScreen.immersiveMode();
    // console.log('Width: ', await this.androidFullScreen.immersiveWidth(), 'Height: ', await this.androidFullScreen.immersiveHeight());
  }

  /**
   * Método para salir de pantalla completa en la app.
   */
  async fullScreenOff() {
    await this.androidFullScreen.showSystemUI();
  }

  /** 
   * Metodo para descargar la imagen de la orden de descuento
  */
  async generarImagenRecibo(data: any){
    console.log(data);
    console.dir('Aqui!!!!');


    /* await this.platform.ready().then(() => {
      this.screenshot.URI(80).then(async (res) => {
        console.log('AQUIII!!!');
         this.socialSharing.share('',null,res.URI,null).then(() => {}, () => { alert('SocialSharing failed');});
          }, () => { alert('Screenshot failed'); 
        });
      }); */

    /* this.screenshot.save('jpg', 95, 'ordenDescuento.jpg').then(res => {
      console.log(res);
      this.screen = res.filePath;
      this.state = true;
      this.reset();
    }); */

    /* const { Filesystem } = Plugins
    
    let url = htmlToImage.toPng(data).then(async dataUrl => {
      var link = document.createElement('a');
      link.download = 'ordenDescuento.jpeg';
      link.href = dataUrl;
      console.log(dataUrl);
      console.dir('Aqui!!!!');
      link.click();
      return dataUrl
      //download(dataUrl, 'ordenDescuento.png');
      
      /* await Filesystem.writeFile({
        path: 'ordenDescuento.png',
        data: dataUrl,
        directory: FilesystemDirectory.ExternalStorage
      })
    }).catch(err => console.log(err)) */
  }

  reset(){
    var self = this;
    setTimeout(() => {
      self.state = false;
    }, 1000);    
  }



  // async showConfirmationModal(title?: string, message?: string) {
  //   // title: String = 'Confirmation title', confirmationMessage: String = 'Default message confirmation'
  //   const modal = await this.modalController.create({
  //     component: ModalConfirmationComponent,
  //     cssClass: 'modal__confirmation',
  //     backdropDismiss: false,
  //     swipeToClose: false,
  //     componentProps: {
  //       title: title || 'Default title',
  //       confirmationMessage: message || 'Default message confirmation',
  //     }
  //   });

  //   modal.onDidDismiss().then(data => {
  //     console.log(data);
  //   })

  //   modal.present();
  // }

  // /**
  //  * Método para lanzar el modal con un contenido dinámico establecido por los parámetros.
  //  * @param title Cadena de texto con el título del modal.
  //  * @param body Cadena de texto con el contenido o cuerpo del modal
  //  * @param showClose Boolean para mostrar o no el boton con "X" para cerrar el modal.
  //  * @param validate Boolean para mostrar o no el modal de validación de correo
  //  */
  // async showModalHtmlTemplate(title: string = 'Test', body: string = '<h2>Template text</h2>', showClose: boolean = true, data?: Object, customClass: string = 'modal__template') {
  //   const modal = await this.modalController.create({
  //     component: ModalTemplateComponent,
  //     cssClass: customClass,
  //     swipeToClose: false,
  //     componentProps: {
  //       htmlTemplate: true,
  //       showClose,
  //       title,
  //       data,
  //       body
  //     }
  //   });

  //   modal.onDidDismiss().then(data => {
  //     console.log(data);
  //   });

  //   return modal.present();
  // }

  // /**
  // * Método para lanzar mensaje tipo toast con diferentes opciones.
  // */
  // presentToastWithOptions() {
  //   this.toastController.create({
  //     header: 'Toast header',
  //     message: 'Click to Close',
  //     position: 'top',
  //     buttons: [
  //       {
  //         side: 'start',
  //         icon: 'star',
  //         text: 'Favorite',
  //         handler: () => {
  //           console.log('Favorite clicked');
  //         }
  //       }, {
  //         text: 'Done',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   }).then(toast => toast.present());
  // }

  // /**
  //  * 
  //  * @param header 
  //  * @param message 
  //  * @param textConfirm 
  //  * @param textCancel 
  //  */
  // showConfirmDialog(header: string, message: string, textConfirm?: string, textCancel?: string) {
  //   return new Promise((resolve, reject) => {
  //     this.alertController.create({
  //       cssClass: 'custom__alert',
  //       header: header || 'Header title',
  //       message: message || 'Text content body',
  //       buttons: [
  //         {
  //           text: textCancel || 'Volver',
  //           role: 'cancel',
  //           handler: () => resolve(false)
  //         },
  //         {
  //           text: textConfirm || 'Sí, seguro',
  //           role: 'confirm',
  //           cssClass: 'confirm',
  //           handler: () => resolve(true)
  //         }
  //       ]
  //     }).then(alert => {
  //       alert.present()
  //     });
  //   });
  // }
 // ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
  // ### ### ### ### ### ### Library ScreenShot  ### ### ### ### ### ### ###
  // ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###

  async generateImg(node: HTMLElement, save: boolean = false): Promise<any> {
    let _name = `${new Date().getTime()}_ticket.png`;
    let _cloneNode = this.getElementStructure(node);
    let canvas = document.createElement('canvas') as HTMLCanvasElement;

    let _img: any = await rasterizeHTML.drawHTML(_cloneNode.outerHTML, canvas, { zoom: 2 });
    let { width, height } = _img.image;


    let _canvas = document.createElement('canvas') as HTMLCanvasElement;
    let ctx = _canvas.getContext('2d');
    _canvas.width = width + 12;
    _canvas.height = height + 12;

    ctx.drawImage(_img.image, 0, 0)
    let dataURL = _canvas.toDataURL();

    let _res = await fetch(dataURL);
    let _blob = await _res.blob();
    let _file = new File([_blob], _name, { type: "image/png" });

    let _imgOut = { image: _img.image, base64: dataURL, file: _file, blob: _blob, name: _name, svg: _img.svg };
    save && await this.savePicture(_imgOut, 'ticket');
    return Promise.resolve(_imgOut);
  }

  getElementStructure(node) {
    let _cloneNode = node.cloneNode() as HTMLElement;
    let _childs = [...node.childNodes].filter(_chn => ![3, 8].includes(_chn.nodeType));
    let _childsText = [...node.childNodes].filter(_chn => [3].includes(_chn.nodeType));

    if (_childs.length) {
      let __childs = [];
      _childs.forEach(__child => {
        let _tmp = this.getElementStructure(__child);
        _tmp && __childs.push(_tmp);
      });
      _cloneNode = this.getNodeStyles(node);
      __childs.length && __childs.forEach(__child => _cloneNode.appendChild(__child));
    } else {
      let _nodeStyles = this.getNodeStyles(node);
      if (_childsText.length) _nodeStyles.textContent = _childsText[0].textContent;
      return _nodeStyles;
    }
    return _cloneNode;
  }

  getNodeStyles(node: HTMLElement) {
    let _stylesNode = window.getComputedStyle(node);
    let cssText = Object.values(_stylesNode).reduce((css, propertyName) => `${css}${propertyName}:${_stylesNode.getPropertyValue(propertyName)};`);
    let output = node.cloneNode() as HTMLElement;
    output.style.cssText = cssText;
    return output;
  }

  /**
   * Method to save file image on device
   * @param photo Image data on base64 codeification
   * @param name Name to save file
   * @param path Directory to save the file
   * @returns Boolean true fi successfully saved false if fails
   */
  async savePicture(photo: any, name?, path?) {
    let _name = `img_${name ? name + '_' : ''}${new Date().getTime()}.png`;
    let _platform = Capacitor.getPlatform();

    console.log(_platform);
    
    //if (_platform != 'android') return
    
    let _rootDirectory = `${this.file.externalRootDirectory}pictures`;
    if (_platform === 'ios') {
      _rootDirectory = `${this.file.applicationStorageDirectory}`;
    }
    let _picuturePath = 'descuentos_medicos' || path;
    let _directory = `${_rootDirectory}/${_picuturePath}`;
    
    try {
      await this.file.checkDir(_rootDirectory, _picuturePath);
    } catch (error) {
      await this.file.createDir(_rootDirectory, _picuturePath, true);
    }

    let _savedFile = await this.file.createFile(_directory, _name, true);

    this.file.writeFile(_directory, _savedFile.name, photo.blob, { replace: true, append: false })
      .then(createdFile => {
        photo.saved = true;
        photo.rute = createdFile.nativeURL
      }).catch(err => err);

    return photo;
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  showLocalNotification({ text, title, attachments, share }: any) {

    let actions = [];
    // if (share) {
    //   actions.push({ id: 'share', title: 'compartir' });

    //   this.localNotifications.on('share').subscribe(notification => {
    //     // TODO: Execute action to share notification
    //   })
    // }

    // this.localNotifications.schedule({
    //   title, text, attachments,
    //   vibrate: true,
    //   actions
    // });
  }

  // ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
  // ### ### ### ### ### ### ### End Library Me  ### ### ### ### ### ### ###
  // ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###
}
