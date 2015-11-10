/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';

import {Router} from 'angular2/router';

import {Characters} from 'collections/characters';

import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';
@Component({
	selector: 'combat-display'
})
@View({
	templateUrl: 'client/combat-display/combat-display.html',
	directives: [FORM_DIRECTIVES, NgFor]
})
export class CombatDisplay {

		characters: any[];
		enemies: any[];

		constructor() {
				this.characters = [];
				this.enemies = [];
		}

		addCharacter() {
			var ele: HTMLInputElement =
				<HTMLInputElement>document.querySelector('.js-character');
			var val = ele.value;
			if(val)
					this.characters.push({ name: val });
		}

		removeCharacter(character) {
				var i = this.characters.indexOf(character);
				if(i > -1)
					this.characters.splice(i, 1);
		}

		addEnemy() { 
			var ele: HTMLInputElement =
					<HTMLInputElement>document.querySelector('.js-enemy');
			var val = ele.value;
			if (val)
					this.enemies.push({ name: val });
		}

		removeEnemy(enemy) {
				var i = this.enemies.indexOf(enemy);
				if (i > -1)
				this.enemies.splice(i, 1);
		}
}