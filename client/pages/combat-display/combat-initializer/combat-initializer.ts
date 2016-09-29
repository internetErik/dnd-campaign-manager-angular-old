import 'reflect-metadata';
import {Component, EventEmitter} from '@angular/core';
import {CombatantAdder} from './combatant-adder/combatant-adder';  
import {CombatantList} from './combatant-list/combatant-list';  
@Component({
	selector: 'combat-initializer',
  inputs: ['combatants', 'localControlled'],
	outputs: ['combatantsAdded', 'removeCombatant', 'startTriggered', 'combatantControlled', 'combatantReleased'],
	template: `
	<h2>Add Combatants</h2>
  <combatant-adder
    (combatantsAdded)="addCombatants($event)"></combatant-adder>

  <combatant-list 
    [combatants]="combatants"
    [localControlled]="localControlled"
    (removeCombatant)="remove($event)"
    (combatantControlled)="controlCombatant($event)"
    (combatantReleased)="releaseCombatant($event)"></combatant-list>
  
  <button 
    *ngIf="combatants && combatants.length > 1" 
    (click)="startBattle()">Start</button>
  `
})
export class CombatInitializer {
  combatants: any[];
  localControlled: any[] = [];

	combatantsAdded: EventEmitter<any> = new EventEmitter();
  removeCombatant: EventEmitter<any> = new EventEmitter();
  startTriggered: EventEmitter<any> = new EventEmitter();
  combatantControlled: EventEmitter<any> = new EventEmitter();
  combatantReleased: EventEmitter<any> = new EventEmitter();

  remove(combatant) {
    this.removeCombatant.emit(combatant);
  }

  addCombatants(combatants: any[]) {
    this.combatantsAdded.emit(combatants);
  }

  startBattle() {
    this.startTriggered.emit(void(0))
  }

  controlCombatant(combatant) {
    this.combatantControlled.emit(combatant);
  }

  releaseCombatant(combatant) {
    this.combatantReleased.emit(combatant);
  }
}