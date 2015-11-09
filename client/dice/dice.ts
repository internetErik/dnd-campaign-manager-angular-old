/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';


@Component({
    selector: 'dice'
})
@View({
		templateUrl: 'client/dice/dice.html',
		directives: [NgFor, NgIf]
})
export class Dice {
	currentRoll: string;
	lastRolls: string[];
	disabled: boolean;

	constructor() {
			this.currentRoll = '';
			this.lastRolls = [];
			this.disabled = false;
	}


	simpleRoll(sides) {
			this.addLastRoll(this.currentRoll);
			this.disabled = true;
			this.currentRoll = '. . . ROLLING! . . .';
			setTimeout(() => {
				let roll = (Math.floor((Math.random() * 100)) % sides) + 1;
				this.currentRoll = `${roll} (d${sides})`;
				this.disabled = false;
			}, 250);
	}

	addLastRoll(roll) {
		if(roll) {
			this.lastRolls.push(roll);
			if (this.lastRolls.length > 5)
					this.lastRolls.shift();
		}
	}

	clearLastRolls() {
			this.lastRolls = [];
	}

}