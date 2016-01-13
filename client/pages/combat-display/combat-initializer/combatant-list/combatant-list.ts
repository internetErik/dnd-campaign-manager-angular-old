import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'combatant-list',
  inputs: ['combatants'],
  outputs: ['removeCombatant'],
  template: `
  <div class="p20-0">
    <h3>Combatants:</h3>
    <ul>
      <li *ngFor="#combatant of combatants">
      {{ combatant.name }} (bonus: {{combatant.bonus}})
      <button (click)="remove(combatant)">-</button>
      </li>
    </ul>
  </div>
  `
})
export class CombatantList {
  combatants: any[];
  removeCombatant: EventEmitter<any> = new EventEmitter();

  remove(combatant) {
    this.removeCombatant.emit(combatant);
  }
}