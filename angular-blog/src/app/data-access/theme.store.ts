import { effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Theme } from '../../themes';

type ThemeState = {
  theme: Theme;
};

const initialState = (): ThemeState => ({
  theme: 'dark',
});

export const ThemeStore = signalStore(
  withState(initialState()),
  withMethods((state) => ({
    setTheme(theme: Theme) {
      patchState(state, { theme });
    },
  })),
  withHooks((state) => ({
    onInit() {
      const fromStorage = localStorage.getItem('theme');

      if (fromStorage) {
        state.setTheme(fromStorage as Theme);
      }

      effect(() => {
        localStorage.setItem('theme', state.theme());
      });
    },
  })),
);
