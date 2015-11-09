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

	//are the dice visible?
	diceHidden: boolean;

	constructor() {
			this.currentRoll = '';
			this.lastRolls = [];
			this.disabled = false;
			this.diceHidden = true;
	}


	simpleRoll(sides) {
			this.disabled = true;
			this.currentRoll = '. . . ROLLING! . . .';
			setTimeout(() => {
				let roll = (Math.floor((Math.random() * 100)) % sides) + 1;
				this.currentRoll = `${roll} (d${sides})`;
				this.disabled = false;
				this.addLastRoll(this.currentRoll);
			}, 250);
	}

	addLastRoll(roll) {
		if(roll) {
			this.lastRolls.push(roll);
			if (this.lastRolls.length > 5)
					this.lastRolls.shift();
		}
	}

	clearRolls() {
			this.currentRoll = '';
			this.lastRolls = [];
	}

	toggleDice() {
			this.diceHidden = !this.diceHidden;
	}

}