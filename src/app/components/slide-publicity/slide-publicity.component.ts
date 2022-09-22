import { IonSlides } from '@ionic/angular';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'slide-publicity',
  templateUrl: './slide-publicity.component.html',
  styleUrls: ['./slide-publicity.component.scss'],
})
export class SlidePublicityComponent implements OnInit {
  @ViewChild('slidesPublicity') slides: IonSlides;

  @Input() pagination: boolean = true;
  @Input() card: boolean = false;
  @Input() height: number;
  @Input() slideData;

  sliderImagesServices: [] = [];

  slideOptsOne = {
    centeredSlides: true,
    slidesPerView: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 3000
  };

  ngOnInit() {
    if (this.card) {
      this.slideData = this.slideData.map(rs => new Object({"rute": rs['path'] }));
    }
  }

  async nextSlide() {
    console.log(this.slides);

    if (await this.slides.isEnd()) {
      this.slides.slideTo(0);
      return
    }
    this.slides.slideNext();
  }

  async prevSlide() {
    if (await this.slides.isBeginning()) {
      this.slides.slideTo(this.slideData.length - 1)
      return;
    }
    this.slides.slidePrev();
  }
}
