import { Component } from '@angular/core';
 
@Component({
  selector: 'app',
  template: `
    <command-palette></command-palette>
    <navigation class="add-shadow"></navigation>
    <div class="bgc-lightgray posf max-width max-height"></div>
    <div class="mt20 posr">
      <div class="bgc-white p50 grid-container add-shadow">
        <router-outlet></router-outlet>
      </div>
    </div>
    <dice-helper></dice-helper>
  `,
})
export class AppComponent {}