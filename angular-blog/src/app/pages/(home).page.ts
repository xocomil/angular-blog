import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'angular-blog-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: ` <angular-blog-analog-welcome /> `,
})
export default class HomeComponent {}
