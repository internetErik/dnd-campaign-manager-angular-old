/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts.d.ts" />

import {Component, View, NgFor, FORM_DIRECTIVES} from 'angular2/angular2';

import {simpleRoll} from 'lib/dice';

@Component({
	selector: 'combat-display'
})
@View({
	templateUrl: 'client/combat-display/combat-display.html',
	directives: [NgFor, FORM_DIRECTIVES]
})
export class CombatDisplay {

	characters: any[];

	constructor() {
		this.characters = [];
	}

	rollInitiative() {
		this.characters = this.characters
		.map((c) => { 
			if (c.roundsOccupied > 0) {
				c.initiative = 0;
				c.roundsOccupied--;
			}
			else
				c.initiative = simpleRoll(100) + (c.bonus || 0);
			return c; 
		})
		.sort((a:any, b:any) => {
			if (a.initiative > b.initiative)
				return -1;
			else if (a.initiative < b.initiative)
				return 1;
			else
				return 0;
		});
	}

	add(type) {
		var eName: HTMLInputElement =
				<HTMLInputElement>document.querySelector('.js-' + type);
		var eBonus: HTMLInputElement =
				<HTMLInputElement>document.querySelector('.js-bonus-' + type);
		var name = eName.value;
		var bonus = parseInt(eBonus.value);
		if(name)
			this.characters.push({ 
				name: name, 
				initiative: 0,
				bonus:  bonus || 0,
				type: type, 
				roundsOccupied: 0 
			});
	}

	remove(character) {
		var i = this.characters.indexOf(character);
		if(i > -1)
			this.characters.splice(i, 1);
	}
}