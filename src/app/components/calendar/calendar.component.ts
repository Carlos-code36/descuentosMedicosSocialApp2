import { Component, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, Renderer2, ElementRef, Input } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';

// import { format, startOfDay, addHours } from 'date-fns';
import { CalendarDateFormat } from '@app/providers/calendar-date-format.service';
import { Globals } from '@app/globals';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: CalendarDateFormatter,
    useClass: CalendarDateFormat,
  }]
})
export class CalendarComponent {
  @Input('minimalist') minimalist: boolean = true;
  @Output() date = new EventEmitter();

  holidays: Array<any> = [];
  view: CalendarView = CalendarView.Month;
  events: CalendarEvent[] = [];
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  constructor(
    private render: Renderer2,
    private _globals: Globals,
    private chageDetector: ChangeDetectorRef
  ) {
    this.generateHolidays();
    this.initializeEventsDate();
  }

  initializeEventsDate() {
    this.events = [...this.holidays];
    this.chageDetector.markForCheck();
  }

  generateHolidays() {
    this.holidays = [];

    this._globals.HOLIDAYS.forEach(day => {
      this.holidays.push({
        start: new Date(`${day.date.split('T')[0]}, 00:00`),
        title: day.name,
        cssClass: 'holiday'
      });
    });
  }

  selectDay(day) {
    if (day.events.length) console.log(day.events);

    this.setFullMode();
    this.date.emit(day.date);
  }

  setMinimalistMode() {
    let days_container = document.getElementsByClassName('cal-days')[0];
    this.render.addClass(days_container, 'minimalist');
  }

  setFullMode() {
    let days_container = document.getElementsByClassName('cal-days')[0];
    this.render.removeClass(days_container, 'minimalist');
  }

  dateIsValid(date: Date): boolean {
    return date.getTime() < new Date().getTime();
  }
}
