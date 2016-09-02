import { Component } from '@angular/core';
import {Navigation}         from './shared/navigation/navigation';
import {DiceHelper}         from './shared/dice-helper/dice-helper';
import {CommandPalette}     from './shared/command-palette/command-palette';
import { ROUTER_DIRECTIVES } from '@angular/router';
 
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
  directives: [ROUTER_DIRECTIVES, Navigation, DiceHelper, CommandPalette]
})
export class AppComponent {}