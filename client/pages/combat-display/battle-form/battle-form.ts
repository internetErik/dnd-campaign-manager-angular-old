import 'reflect-metadata';
import {Component, EventEmitter} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';

@Component({
  selector: 'battle-form',
  inputs: ['battle'],
  outputs: ['nameUpdated', 'battleDeleted'],
  template: `  
  <div class="p20-0">
    <label for="battlename">Battle Name:</label>
    <input type="text" [(ngModel)]="battle.name"> 
    <button (click)="updateName()">Update Name</button>
  </div>
  <div class="p20-0">
    <button (click)="deleteBattle()">Delete Battle</button>
  </div>
  `
})
export class BattleForm extends MeteorComponent {
  battle: any;
  nameUpdated: EventEmitter<any> = new EventEmitter();
  battleDeleted: EventEmitter<any> = new EventEmitter();
  constructor() {super();}
  updateName() {
    if(this.battle.name !== '')
      this.nameUpdated.emit(this.battle.name);
  }
  deleteBattle() {
    if(confirm("Delete this battle?"))
      this.battleDeleted.emit(void(0));
  }
}