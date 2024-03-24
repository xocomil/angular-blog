import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ThemeStore } from './data-access/theme.store';

@Component({
  selector: 'angular-blog-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <blog-header class="flex-none" />
    <div class="flex-grow overflow-hidden">
      <router-outlet></router-outlet>
    </div>
  `,
  host: {
    class: 'block flex flex-col h-full w-full max-w-full max-h-full',
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
