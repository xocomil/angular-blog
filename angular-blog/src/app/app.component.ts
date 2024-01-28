import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'angular-blog-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  host: {
    class: 'block h-full w-full max-w-full max-h-full'
  }
})
export class AppComponent {}
