import { Component } from '@angular/core';
import template from './app.component.html';
 
// @Component({
//   selector: 'app',
//   template: `
//   <command-palette></command-palette>
//   <div class="bgc-lightgray posf max-width max-height"></div>
//   <navigation class="add-shadow"></navigation>
//   <div class="mt20 posr">
//     <div class="bgc-white p50 grid-container add-shadow">
//       <router-outlet></router-outlet>
//     </div>
//   </div>
//   <dice-helper></dice-helper>
//   `,
//   directives: [ROUTER_DIRECTIVES, Navigation, DiceHelper, CommandPalette]
// })
@Component({
  selector: 'app', 
  template
})
export class AppComponent {}