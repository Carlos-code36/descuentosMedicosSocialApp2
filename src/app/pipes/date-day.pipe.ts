import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDay'
})
export class DateDayPipe implements PipeTransform {

  transform(value: Date): string {
    let entryDate = new Date(value);
    let dateDay: any;

    dateDay = {
      numberDay: entryDate.getDate(),
      labelDay: this.getNameDay(entryDate.getDay())
    }

    // console.log(this.getNameDay(entryDate.getDay()));
    return dateDay;
  }

  getNameDay(numberDay: number): string {
    let days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    let simpleDays = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

    return simpleDays[numberDay];
  }

}
