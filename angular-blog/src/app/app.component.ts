import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeStore } from './data-access/theme.store';
import HeaderComponent from './pages/(home)/header.component.analog';

@Component({
  selector: 'angular-blog-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <Header class="flex-none"></Header>
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
