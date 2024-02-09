import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeStore } from './data-access/theme.store';

@Component({
  selector: 'angular-blog-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  host: {
    class: 'block h-full w-full max-w-full max-h-full',
    '[attr.data-theme]': 'themeStore.theme()',
  },
  providers: [ThemeStore],
})
export class AppComponent {
  protected readonly themeStore = inject(ThemeStore);

  constructor() {
    afterNextRender(() => {
      console.log('AppComponent rendered');
    });
  }
}
