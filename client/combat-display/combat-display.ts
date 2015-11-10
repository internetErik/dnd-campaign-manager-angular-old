/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';

import {simpleRoll} from 'lib/dice';

@Component({
	selector: 'combat-display'
})
@View({
	templateUrl: 'client/combat-display/combat-display.html',
	directives: [NgFor]
})
export class CombatDisplay {

		characters: any[];
		enemies: any[];

		constructor() {
				this.characters = [];
				this.enemies = [];
		}

		rollInitiative() {
			this.characters = this.characters
					.map((c) => { 
							c.initiative = simpleRoll(100);
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
			var ele: HTMLInputElement =
				<HTMLInputElement>document.querySelector('.js-' + type);
			var val = ele.value;
			if(val)
					this.characters.push({ name: val, initiative: 0, type: type });
		}

		remove(character) {
				var i = this.characters.indexOf(character);
				if(i > -1)
					this.characters.splice(i, 1);
		}
}