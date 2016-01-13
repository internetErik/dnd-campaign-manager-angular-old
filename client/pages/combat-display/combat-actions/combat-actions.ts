import {Component, EventEmitter} from 'angular2/core';
import {CombatActionInput} 
  from 'client/pages/combat-display/combat-action-input/combat-action-input';

import {simpleRoll} from 'lib/dice';

@Component({
  selector: 'combat-actions',
  inputs: ['battle'],
  outputs: ['battleModified'],
  directives: [CombatActionInput],
  template: `

  <section class="p20-0 m20-0" *ngIf="battle.combatPhase !== -1">
  <h2>Combatants</h2>
  <ol *ngIf="battle">
    <li *ngFor="#combatant of battle.combatants"
      [class.enemy]="combatant.type === 'enemy'"
      class="mb20 p10-0 bb1-s-black">
      
      <h4>{{ combatant.name }}</h4>

      <combat-action-input 
        *ngIf="battle.combatPhase === 0"
        [submitted]="combatant.actionSubmitted"
        (actionSubmitted)="submitAction($event, combatant)"
        (actionUnsubmitted)="unsubmitAction(combatant)"></combat-action-input>

      <div *ngIf="battle.combatPhase === 1">
        <label>Action:</label>
        <div class="p10-0">
          {{ combatant.action }}
        </div>
      </div>

      <div>
        initiative: {{ combatant.initiative }} | 
        
        Bonus: 
        <input type="number" min="-100" max="100" 
          [(ngModel)]="combatant.bonus">
        
        Rounds Occupied: 
        <input type="number" min="0" max="100" 
          [(ngModel)]="combatant.roundsOccupied">

        <button (click)="removeCombatant(combatant)">remove</button>
      </div>
    </li>
  </ol>
  </section>
  <section class="jump-menu p10 r0 vertical-align-fixed bgc-white add-shadow">
    <h5>Combat Phases</h5>
    <span [class.c-gray]="battle.combatPhase !== 0">Enter Actions</span>
    <button [class.c-gray]="battle.combatPhase !== 1" 
      (click)="resolveRound()">Turn Resolved</button>
  </section>
  `
})
export class CombatActions {
  // combat phases
  //-1 = not started
  // 0 = decide action
  // 1 = resolve round

  battle: any;
  battleModified: EventEmitter<any> = new EventEmitter();

  removeCombatant(character) {
    var i = this.battle.combatants.indexOf(character);
    if (i > -1) {
      this.battle.combatants.splice(i, 1);
      this.battleModified.emit(void(0));
    }
  }

  submitAction(action: string, combatant: any) {
    //combat phase will be advanced on server if this is the last action 
    //we are waiting on
    if (!combatant.actionSubmitted) {
      combatant.action = action;
      combatant.actionSubmitted = true;
      this.battleModified.emit(void(0));
    }
  }

  unsubmitAction(combatant: any) {
    combatant.action = null;
    combatant.actionSubmitted = false;
    this.battleModified.emit(void(0));
  }

  resolveRound() {
    this.battle.combatPhase = 0;
    this.battle.combatants.forEach((c) => { 
      c.action = '';
      c.actionSubmitted = false; 
      c.initiative = 0;
      if(c.roundsOccupied > 0)
        c.roundsOccupied--;
    });
    this.battleModified.emit(void(0));
  }
}