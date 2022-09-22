import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'individual-rate',
  templateUrl: './individual-rate.component.html',
  styleUrls: ['./individual-rate.component.scss'],
})
export class IndividualRateComponent {
  @Input('score') score;
  @Input('size') size = "16px";
  @Input('spacing') spacing = '2px';

  stars_score = [0, 0, 0, 0, 0];

  constructor() { }

  ngOnInit() {
    this.stars_score = this.stars_score.map(sc => {
      if (this.score >= 1) {
        this.score -= 1;
        return 1;
      } else {
        let tmp = this.score;
        this.score -= this.score;
        return tmp;
      }
    });
  }

  selectStar(score: number) {
    if (score == 0) return 'assets/icon/star_outline.svg'
    if (score >= 0.5 && score <= 1) return 'assets/icon/star_fill.svg'
    if (score > 0 && score <= 0.5) return 'assets/icon/star_medium.svg'
  }
}
