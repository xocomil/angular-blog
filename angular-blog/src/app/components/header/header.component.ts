import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Theme, themes } from '../../../themes';
import { ThemeStore } from '../../data-access/theme.store';

@Component({
  selector: 'blog-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex-1 justify-center cursor-pointer" routerLink="/">
      <h1>Welcome</h1>
    </div>
    <div class="flex-none">
      <select
        class="select select-bordered select-sm text-base-content"
        (change)="themeSelected($event)"
      >
        <option value="" disabled>Theme</option>
        @for (theme of themes(); track theme) {
          <option [value]="theme" [selected]="theme === themeStore.theme()">
            {{ theme }}
          </option>
        }
      </select>
    </div>
  `,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'block w-full h-16 bg-primary flex p-4 items-center text-primary-content',
  },
})
export class HeaderComponent {
  protected readonly themeStore = inject(ThemeStore);
  protected readonly themes = signal(themes);

  protected themeSelected(event: Event) {
    if (hasThemeValue(event.target)) {
      this.themeStore.setTheme(event.target.value);
    }
  }
}

function hasThemeValue(eventTarget: unknown): eventTarget is { value: Theme } {
  if (!hasValueProperty(eventTarget)) {
    return false;
  }

  return themes.includes(eventTarget.value as Theme);
}

function hasValueProperty(
  eventTarget: unknown,
): eventTarget is { value: unknown } {
  return (
    eventTarget != null &&
    typeof eventTarget === 'object' &&
    'value' in eventTarget
  );
}
