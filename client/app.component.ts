import { Component }        from '@angular/core';
 
@Component({
  selector: 'app',
  template: `
  <command-palette></command-palette>
  <div class="bgc-lightgray posf max-width max-height"></div>
  <navigation class="add-shadow"></navigation>
  <div class="mt20 posr">
    <div class="bgc-white p50 grid-container add-shadow">
      <router-outlet></router-outlet>
    </div>
  </div>
  <dice-helper></dice-helper>
  `,
})
export class AppComponent {}