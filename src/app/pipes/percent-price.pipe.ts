import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from "@angular/common";

@Pipe({
  name: 'percentPrice'
})
export class PercentPricePipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) { }

  transform(price: any, percent?: any): any {
    let value = (price - (percent * price) / 100);

    return `$ ${this.decimalPipe.transform(value,'1.0')}`;
  }
}
