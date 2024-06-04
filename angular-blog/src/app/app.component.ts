import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// @ts-ignore
import BlogFooter from './components/footer/blog-footer.component.analog';
// @ts-ignore
import BlogHeader from './components/header/blog-header.component.analog';
import { ThemeStore } from './data-access/theme.store';

@Component({
  selector: 'angular-blog-root',
  standalone: true,
  imports: [BlogFooter, BlogHeader, RouterOutlet],
  template: `
    @defer {
      <BlogHeader class="flex-none" />
    }
    <div class="flex-grow overflow-hidden">
      <router-outlet></router-outlet>
    </div>
    @defer {
      <BlogFooter class="flex-none" />
    }
  `,
  host: {
    class: 'block flex flex-col h-full w-full max-w-full max-h-full',
    '[attr.data-theme]': 'themeStore.theme()',
  },
  providers: [ThemeStore],
})
export class AppComponent {
  protected readonly themeStore = inject(ThemeStore);
}
