import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
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
);
