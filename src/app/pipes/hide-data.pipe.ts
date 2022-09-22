import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideData'
})
export class HideDataPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    console.log(value.slice(2));
    
    return 'algo';
  }
}
