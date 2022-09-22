import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'horas'
})
export class HorasPipe implements PipeTransform {
 
  transform(value: string, ): string {
    
    switch (value) {
      
      case '12 p.m' :
        return '12 p.m';
 
      case '13 p.m' :
        return '1 p.m';
 
      case '14 p.m' :
        return '2 p.m';
 
      case '15 p.m' :
        return '3 p.m';
 
      case '16 p.m' :
        return '4 p.m';
 
      case '17 p.m' :
        return '5 p.m';
 
      case '18 p.m' :
        return '6 p.m';
 
      case '19 p.m' :
        return '7 p.m';
 
      case '20 p.m' :
        return '8 p.m';
 
      default :
       return value;
    }
 
  
  }
 
}