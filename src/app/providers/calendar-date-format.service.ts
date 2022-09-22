import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import localeEs from "@angular/common/locales/es";

@Injectable()
export class CalendarDateFormat extends CalendarDateFormatter {

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    let headerTitle = formatDate(date, 'EEE', locale);
    return headerTitle.charAt(0).toUpperCase() + headerTitle.slice(1, -1);
  }

  public monthViewTitle({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'MMMM y', locale);
  }

  public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEE', locale);
  }

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale);
  }
}
