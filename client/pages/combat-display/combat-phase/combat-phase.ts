import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'combat-phase',
  inputs: ['battle'],
  outputs: ['roundResolved'],
  template: `
  <section
    *ngIf="battle"
    class="jump-menu p10 r0 vertical-align-fixed bgc-white add-shadow">
    <h5>Combat Phases</h5>
    <span [class.c-gray]="battle.combatPhase !== 0">Enter Actions</span>
    <button 
      class="p10"
      [class.c-gray]="battle.combatPhase !== 1" 
      (click)="resolveRound()">Turn Resolved</button>
  </section>
  `
})
export class CombatPhase {
  // combat phases
  //-1 = not started
  // 0 = decide action
  // 1 = resolve round
  battle: any;
  roundResolved: EventEmitter<any> = new EventEmitter();

  resolveRound() {
    if(this.battle.combatPhase === 1)
      this.roundResolved.emit(void(0));
  }
}