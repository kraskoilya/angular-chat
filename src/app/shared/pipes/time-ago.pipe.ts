import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  constructor(private readonly datePipe: DatePipe) {}

  transform(value: string | Date | undefined, ...args: unknown[]): unknown {
    if (!value) {
      value = new Date();
    }
    if (typeof value !== 'object') {
      value = new Date(value);
    }
    const seconds = Math.floor(
      (new Date().getTime() - new Date(value).getTime()) / 1000
    );

    let interval = seconds / 31536000;

    if (interval > 1) {
      return this.datePipe.transform(new Date(value), 'dd/MM/yyyy');
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return this.datePipe.transform(new Date(value), 'dd/MM/yyyy hh:mm:ss');
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + 'days ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + 'hours ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + 'minutes ago';
    }

    interval = seconds;
    if (interval < 0) {
      interval = 0;
    }
    return Math.floor(interval) + 'seconds ago';
  }
}
