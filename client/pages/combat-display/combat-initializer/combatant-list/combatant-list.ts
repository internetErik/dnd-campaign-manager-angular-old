import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'combatant-list',
  inputs: ['combatants', 'localControlled'],
  outputs: ['removeCombatant', 'combatantControlled', 'combatantReleased'],
  template: `
  <div class="p20-0">
    <h3>Combatants:</h3>
    <ul>
      <li 
        *ngFor="#combatant of combatants"
        class="p5-0">
        {{ combatant.name }} (bonus: {{combatant.bonus}})
        <button (click)="remove(combatant)">remove</button>
        
        <button *ngIf="!combatantIsControlled(combatant)" (click)="controlCombatant(combatant)">control</button>
        <button *ngIf="combatantIsControlled(combatant)" (click)="releaseCombatant(combatant)">release</button>
      </li>
    </ul>
  </div>
  `
})
export class CombatantList {
  combatants: any[];
  localControlled: any[] = [];

  removeCombatant: EventEmitter<any> = new EventEmitter();
  combatantControlled: EventEmitter<any> = new EventEmitter();
  combatantReleased: EventEmitter<any> = new EventEmitter();

  remove(combatant) {
    this.removeCombatant.emit(combatant);
  }

  controlCombatant(combatant) {
    this.combatantControlled.emit(combatant);
  }

  releaseCombatant(combatant) {
    this.combatantReleased.emit(combatant);
  }

  combatantIsControlled(combatant) {
    return this.localControlled.some((c) => c.name === combatant.name );
  }
}