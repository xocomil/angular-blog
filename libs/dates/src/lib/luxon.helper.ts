import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { DateTimeHelper } from './dateTimeHelper';

@Injectable()
export class LuxonHelper implements DateTimeHelper {
  toBlogArticleDate(date: Date): string {
    const parsedDate = DateTime.fromJSDate(date);
    const fromToday = DateTime.now().diff(parsedDate, 'months');

    if (fromToday.months <= 1) {
      return parsedDate.toRelative() ?? 'meh';
    }

    return parsedDate.toLocaleString(DateTime.DATE_HUGE);
  }
}
