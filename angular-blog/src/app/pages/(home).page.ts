import { Component } from '@angular/core';

@Component({
  selector: 'angular-blog-home',
  standalone: true,
  imports: [],
  template: `<h1>My Blog!</h1>`,
  host: {
    class: 'block'
  }
})
export default class HomeComponent {}
