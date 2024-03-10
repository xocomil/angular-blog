import { InjectionToken, Provider } from '@angular/core';
import { LuxonHelper } from './luxon.helper';

export type DateTimeHelper = {
  toBlogArticleDate: (date: Date) => string;
};

export const DateTimeHelper = new InjectionToken<DateTimeHelper>(
  'DateTimeHelper',
);

export function provideDateTimeHelper(): Provider {
  return [
    {
      provide: DateTimeHelper,
      useClass: LuxonHelper,
    },
  ];
}
