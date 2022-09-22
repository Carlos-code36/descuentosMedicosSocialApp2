import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";

import { environment } from 'src/environments/environment';

@Component({
  selector: 'avatar-provider',
  templateUrl: './avatar-provider.component.html',
  styleUrls: ['./avatar-provider.component.scss'],
})
export class AvatarProviderComponent implements OnInit {
  @ViewChild('background__photo') background__photo: ElementRef;
  @ViewChild('profile__photo') profile__photo: ElementRef;
  @ViewChild('profile__info') profile__info: ElementRef;

  @Input() provider;
  @Input() set scrollPosition(_scrollPosition) {
    setTimeout(() => {
      this.setAnimationScroll(_scrollPosition)
    }, 30);
  }

  coverPage: string;
  profile: string;

  imageViewerCoverpage: any;
  imageViewerProfile: any;
  imageFileCoverpage: any;
  imageFileProfile: any;
  image;

  constructor(
    private photoViewer: PhotoViewer,
    private render: Renderer2,
  ) { }

  ngOnInit() {
    let coverpage = this.getPhotoCoverPage();
    let avatar = this.getPhotoProfile();

    this.coverPage = coverpage ? coverpage.path : 'background_default.jpeg';
    this.profile = avatar ? avatar.path : 'avatarundefined.png';
  }

  getPhotoCoverPage() {
    return this.provider['fotos'].find(dt => dt.favorita == 1 && dt.tipo == 'portada');
  }

  getPhotoProfile() {
    return this.provider['fotos'].find(dt => dt.favorita == 1 && dt.tipo == 'avatar');
  }

  showPhotoAvatar(photo?) {
    console.log(photo);

    if (photo) this.photoViewer.show(photo, '', { share: false });
    else this.photoViewer.show(`${environment.apiUrl}/avatar/${this.getPhotoProfile() ? this.getPhotoProfile()['path'] : 'avatarundefined.png'}`, 'Foto de perfil', { share: false });
  }

  showPhotoCoverPage(photo?) {
    if (photo) this.photoViewer.show(photo, '', { share: false });
    else this.photoViewer.show(`${environment.apiUrl}/avatar/${this.getPhotoCoverPage() ? this.getPhotoCoverPage()['path'] : 'background_default.jpeg'}`, 'Foto de portada', { share: false });
  }

  setAnimationScroll(scrollValue) {
    let temp = (200 - scrollValue) / 5;

    if (!this.profile__photo && !this.profile__info) return
    if (scrollValue < 145) {
      this.render.setStyle(this.profile__photo?.nativeElement, 'position', `relative`);
      this.render.setStyle(this.profile__photo?.nativeElement, 'height', `34vw`);
      this.render.setStyle(this.profile__photo?.nativeElement, 'width', `34vw`);
      this.render.setStyle(this.profile__photo?.nativeElement, 'top', `-15vw`);

      this.render.setStyle(this.profile__photo.nativeElement.children[0], 'min-width', `34vw`);
      this.render.setStyle(this.profile__photo.nativeElement.children[0], 'min-height', `34vw`);
    }

    if (scrollValue > 144 && scrollValue <= 200) {
      console.log('aqui');
      
      this.render.setStyle(this.profile__photo.nativeElement, 'height', `${34 - (15 - temp)}vw`);
      this.render.setStyle(this.profile__photo.nativeElement, 'width', `${34 - (15 - temp)}vw`);
      this.render.setStyle(this.profile__photo.nativeElement, 'top', `${-12 + (15 - temp)}vw`);
      this.render.setStyle(this.profile__photo.nativeElement, 'position', `relative`);

      this.render.setStyle(this.profile__photo.nativeElement.children[0], 'min-width', `${34 - (15 - temp)}vw`);
      this.render.setStyle(this.profile__photo.nativeElement.children[0], 'min-height', `${34 - (15 - temp)}vw`);

      this.render.setStyle(this.profile__info.nativeElement, 'position', `relative`);
      this.render.setStyle(this.profile__info.nativeElement, 'top', `-80px`);
    }

    if (scrollValue > 200) {
      this.render.setStyle(this.profile__photo.nativeElement, 'height', `20.2vw`);
      this.render.setStyle(this.profile__photo.nativeElement, 'width', `20.2vw`);
      this.render.setStyle(this.profile__photo.nativeElement, 'position', `fixed`);
      this.render.setStyle(this.profile__photo.nativeElement, 'top', `17vw`);

      this.render.setStyle(this.profile__photo.nativeElement.children[0], 'min-width', `19.8vw`);
      this.render.setStyle(this.profile__photo.nativeElement.children[0], 'min-height', `19.8vw`);

      this.render.setStyle(this.profile__info.nativeElement, 'position', `fixed`);
      this.render.setStyle(this.profile__info.nativeElement, 'top', `17vw`);
    }
  }
}
