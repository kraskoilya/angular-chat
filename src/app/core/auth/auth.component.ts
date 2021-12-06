import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `<section
    class="w-100 h-100vh d-flex align-items-center justify-content-center"
  >
    <router-outlet></router-outlet>
  </section>`,
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
