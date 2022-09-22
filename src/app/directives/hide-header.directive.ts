import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[hideHeader]'
})
export class HideHeaderDirective implements OnInit {
  @Input('header') header: any;

  private lastY = 10;

  constructor(
    private domCtrl: DomController,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.header = this.header.el;
    
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.header, 'transition', 'margin-top 200ms');
    });
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    if ($event.detail.scrollTop > this.lastY) {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.header, 'margin-top', `-${this.header.clientHeight}px`);
      });
    } else {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.header, 'margin-top', '0');
      });
    }

    this.lastY = $event.detail.scrollTop;
  }
}
