import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent {
  @Output() rateOut = new EventEmitter();

  stars_fill = [0, 0, 0, 0, 0];

  setRate(starPosition) {
    this.stars_fill = this.stars_fill.map((e, i) => i < starPosition ? 1 : 0)
    this.rateOut.emit(starPosition);
  }
}
