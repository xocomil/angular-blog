import { InjectionToken, Provider } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Window');

export function provideWindow(): Provider {
  return {
    provide: WINDOW,
    useFactory: () => {
      if (typeof window !== 'undefined') {
        return window;
      }
      return {};
    },
  };
}
