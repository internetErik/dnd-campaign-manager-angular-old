import {Component, EventEmitter} from 'angular2/core';
import {CombatantAdder}
  from 'client/pages/combat-display/combat-initializer/combatant-adder/combatant-adder';  
import {CombatantList}
  from 'client/pages/combat-display/combat-initializer/combatant-list/combatant-list';
@Component({
	selector: 'combat-initializer',
  inputs: ['combatants'],
	outputs: ['combatantsAdded', 'removeCombatant', 'startTriggered'],
  directives: [CombatantAdder, CombatantList],
	template: `
	<h2>Add Combatants</h2>
  <combatant-adder
    (combatantsAdded)="addCombatants($event)"></combatant-adder>

  <combatant-list 
    [combatants]="combatants"
    (removeCombatant)="remove($event)"></combatant-list>
  
  <button 
    *ngIf="combatants && combatants.length > 1" 
    (click)="startBattle()">Start</button>
  `
})
export class CombatInitializer {
  combatants: any[];

	combatantsAdded: EventEmitter<any> = new EventEmitter();
  removeCombatant: EventEmitter<any> = new EventEmitter();
  startTriggered: EventEmitter<any> = new EventEmitter();

  remove(combatant) {
    this.removeCombatant.emit(combatant);
  }

  addCombatants(combatants: any[]) {
    this.combatantsAdded.emit(combatants);
  }

  startBattle() {
    this.startTriggered.emit(void(0))
  }
}