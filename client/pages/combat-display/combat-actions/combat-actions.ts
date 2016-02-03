import {Component, EventEmitter} from 'angular2/core';
import {CombatActionInput} 
  from 'client/pages/combat-display/combat-actions/combat-action-input/combat-action-input';

import {simpleRoll} from 'lib/dice';

@Component({
  selector: 'combat-actions',
  inputs: ['battle', 'localControlled'],
  outputs: ['battleModified'],
  directives: [CombatActionInput],
  template: `
  <section 
    *ngIf="battle.combatPhase !== -1"
    class="p20-0 m20-0">
  <h2>Combatants</h2>
  <div *ngIf="localControlled.length === 0">
    You aren't controlling any characters! You'd better select some above.
  </div>
  <ol>
    <li *ngFor="#combatant of battle.combatants">
      <div 
        *ngIf="battle.combatPhase === 1 || combatantIsControlled(combatant)"
        [class.enemy]="combatant.type === 'enemy'"
        class="bb1-s-black mb20">

        <h4>{{ combatant.name }}</h4>

        <div *ngIf="battle.combatPhase === 0">
          <combat-action-input 
            [submitted]="combatant.actionSubmitted"
            (actionSubmitted)="submitAction($event, combatant)"
            (actionUnsubmitted)="unsubmitAction(combatant)"></combat-action-input>
        </div>
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
      </div>
    </li>
  </ol>
  </section>
  `
})
export class CombatActions {
  battle: any;
  battleModified: EventEmitter<any> = new EventEmitter();
  localControlled: any[] = [];

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

  combatantIsControlled(combatant): boolean {
    return this.localControlled.some((c) => c.name === combatant.name );
  }
}