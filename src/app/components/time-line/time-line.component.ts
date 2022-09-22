import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss'],
})
export class TimeLineComponent implements OnInit {
  @Input('appointments') listAppointments;
  @Input('beneficiary') isBeneficiary = false;

  dataTime: Array<Object>;

  constructor() { }

  ngOnInit() {
    console.log(this.listAppointments)
    this.dataTime = this.generateStructure(this.listAppointments);
  }

  generateStructure(appointments) {
    console.time();
    let structure = [];
    let dates = [];
    let years = [];
    let months = [];

    appointments.forEach(el => dates.push(el.fechaCita));

    dates = this.sortDates(dates);
    years = this.getYearsForDate(dates);
    months = this.getMonthsForYear(2020, dates);

    // console.log(dates);
    // console.log(years);
    // console.log(months);

    years.forEach(year => {
      structure.push({
        year: year,
        months: []
      })
    })

    structure.forEach(el => {
      this.getMonthsForYear(el.year, dates).forEach(month => {
        el.months.push({
          month: month,
          days: []
        })
      })
    });

    structure.forEach(el => {
      el.months.forEach(mo => {
        let dateDays = this.getDaysForMonth(el.year, mo.month, dates);
        dateDays.forEach(day => {
          mo.days.push({
            date: day,
            appointments: []
          })
        })
      })
    })

    structure.forEach(el => {
      el.months.forEach(mo => {
        mo.days.forEach(day => {
          // console.log(day.date);
          appointments.forEach(appo => {
            let dateAppo = new Date(appo.fechaCita);
            let dateDay = new Date(day.date);

            console.log(dateAppo, dateDay, appo);

            if (dateAppo.toLocaleDateString() === dateDay.toLocaleDateString()) {
              day.appointments.push(appointments.splice(appointments.indexOf(appo), 1)[0]);
            }
          });
        })
      })
    })

    // {
    //   user: 'Anita la huerfanita',
    //   photo: "una foto",
    //   state: 'comming',
    //   date: "6/12/2020 15:50:11",
    //   hour: "15:50:11",
    //   label: "Un texto para mostrar en la llinea de tiempo",
    //   place: 'Centro óptico prevenir'
    // }

    console.log(structure);
    console.timeEnd();
    return structure;
  }

  sortDates(dates: Array<Date>): Array<Date> {
    return [...new Set(dates)].sort((a, b) => {
      a = new Date(a);
      b = new Date(b);
      return a < b ? -1 : a > b ? 1 : 0;
    })
  }

  getYearsForDate(dates: Array<number>) {
    return [...new Set(dates.map(d => new Date(d).getFullYear()))];
  }

  getMonthsForYear(year: number, dates: Array<Date>) {
    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let mnts = dates.filter(el => new Date(el).getFullYear() === year).map(el => months[new Date(el).getMonth()]);
    return [... new Set(mnts)];
  }

  getDaysForMonth(year: number, month: string, dates: Array<Date>) {
    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let indexMonth = months.indexOf(month);
    let days = [];

    dates.forEach(date => {
      let dt = new Date(date);
      if (dt.getMonth() == indexMonth && dt.getFullYear() == year) days.push(date)
    })

    // console.log(days);


    return days;
  }
}