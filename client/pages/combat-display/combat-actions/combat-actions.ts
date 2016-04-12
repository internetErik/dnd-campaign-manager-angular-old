import 'reflect-metadata';
import {Component, EventEmitter} from 'angular2/core';
import {CombatActionInput} from './combat-action-input/combat-action-input';
import {simpleRoll} from '../../../../lib/dice';

@Component({
  selector: 'combat-actions',
  inputs: ['battle', 'localControlled'],
  outputs: ['battleModified', 'releaseLocalControlled'],
  directives: [CombatActionInput],
  template: `
  <section 
    *ngIf="battle.combatPhase !== -1"
    class="p20-0 m20-0">
  <h2>Combatants</h2>
  <div *ngIf="localControlled.length === 0">
    You aren't controlling any characters! You'd better select some above.
  </div>
  <ol *ngIf="battle.combatPhase === 0">
    <li *ngFor="#combatant of localControlled">
      <h4>{{ combatant.name }}</h4>

      <combat-action-input 
        [submitted]="combatant.actionSubmitted"
        (actionSubmitted)="submitAction($event, combatant)"
        (actionUnsubmitted)="unsubmitAction(combatant)"></combat-action-input>
    </li>
  </ol>
  <ol *ngIf="battle.combatPhase === 1">
    <li *ngFor="#combatant of battle.combatants">
      <h4>{{ combatant.name }}</h4>
      <label>Action:</label>
      <div class="p10-0">
        {{ combatant.action }}
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
  `
})
export class CombatActions {
  battle: any;
  releaseLocalControlled: EventEmitter<any> = new EventEmitter();
  battleModified: EventEmitter<any> = new EventEmitter();
  localControlled: any[] = [];

  removeCombatant(character) {
    var i = this.battle.combatants.indexOf(character);
    if (i > -1) {
      this.battle.combatants.splice(i, 1);
      let ch = this.localControlled.filter(c => c.name === character.name);
      if(ch.length > 0)
        this.releaseLocalControlled.emit(ch[0]);
      this.battleModified.emit(void(0));
    }
  }

  submitAction(action: string, combatant: any) {
    //combat phase will be advanced on server if this is the last action 
    //we are waiting on
    var ndx = this.indexOfCombatant(combatant);
    if (ndx > -1 && !this.battle.combatants[ndx].actionSubmitted) {
      combatant.action = "";
      this.battle.combatants[ndx].action = action;
      this.battle.combatants[ndx].actionSubmitted = true;
      this.battleModified.emit(void(0));
    }
  }

  unsubmitAction(combatant: any) {
    var ndx = this.indexOfCombatant(combatant);
    if (ndx > -1) {
      this.battle.combatants[ndx].action = null;
      this.battle.combatants[ndx].actionSubmitted = false;
      this.battleModified.emit(void(0));
    }
  }

  indexOfCombatant(combatant) {
    return this.battle.combatants.reduce((a, c, ndx) => { 
      if (a != -1) return a;
      return (c.name === combatant.name) ? ndx : -1;
    }, -1);
  }
}