import { Injectable } from '@angular/core';
import { DateTimeHelper } from './dateTimeHelper';

@Injectable()
export class IntlHelper implements DateTimeHelper {
  toBlogArticleDate(date: Date): string {
    const parsedDate = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);

    return parsedDate;
  }
}
