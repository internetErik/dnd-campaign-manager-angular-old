import {Component, EventEmitter} from 'angular2/core';

@Component({
	selector: 'combat-initializer',
	outputs: ['combatantsAdded'],
	template: `
	<h2>Add Combatants</h2>
	<div class="p10-0">
		<label class="w90" for="characterName">Character: </label>
		<input id="characterName" type="text" [(ngModel)]="characterName">
		<label for="characterMultiplier"> &times; </label>
		<input id="characterMultiplier" type="number" min="1" max="100" [(ngModel)]="characterMultiplier">
		<label for="characterBonus">Bonus: </label>
		<input id="characterBonus" type="number" min="-100" max="100" [(ngModel)]="characterBonus">
		<button (click)="addCharacter()">+</button>
	</div>
	<div class="p10-0">
		<label class="w90" for="enemyName">Enemy: </label>
		<input id="enemyName" type="text"  [(ngModel)]="enemyName">
		<label for="enemyMultiplier"> &times; </label>
		<input id="enemyMultiplier" type="number" min="1" max="100" [(ngModel)]="enemyMultiplier">
		<label for="enemyBonus">Bonus: </label>
		<input id="enemyBonus" type="number" min="-100" max="100" [(ngModel)]="enemyBonus">
		<button (click)="addEnemy()">+</button>
	</div>
	<button (click)="startBattle()">Start</button>
	<button (click)="endBattle()">End</button>
	`
})
export class CombatInitializer {
	characterName: string;
	characterBonus: number;
	characterMultiplier: number;
	enemyName: string;
	enemyBonus: number;
	enemyMultiplier: number;

	combatantsAdded: EventEmitter<any> = new EventEmitter();

	addCharacter() {
		if (this.characterName !== '') {
			this.emitCombatants('character', 
				this.characterName, 
				this.characterBonus, 
				this.characterMultiplier);
			this.characterName = '';
			this.characterBonus = 0;
			this.characterMultiplier = 1;
		}
	}

	addEnemy() {
		if (this.enemyName !== '') {
			this.emitCombatants('enemy',
				this.enemyName,
				this.enemyBonus,
				this.enemyMultiplier);
			this.enemyName = '';
			this.enemyBonus = 0;
			this.enemyMultiplier = 1;
		}
	}

	emitCombatants(type, name, bonus, multiplier) {
		var combatants = (multiplier > 1) ?
			Array.apply(null, { length: multiplier }).map((x, i) => {
				return {
					name: `${name} ${i+1}`,
					initiative: 0,
					bonus: bonus,
					type: type,
					roundsOccupied: 0,
					action: '',
					actionSubmitted: false
				};
			}) :
			[{
				name: name,
				initiative: 0,
				bonus: bonus,
				type: type,
				roundsOccupied: 0,
				action: '',
				actionSubmitted: false
			}];
		this.combatantsAdded.emit(combatants);
	}
}