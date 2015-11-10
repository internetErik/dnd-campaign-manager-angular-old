/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {Rolls} from 'collections/rolls';

@Component({
    selector: 'dice'
})
@View({
		templateUrl: 'client/dice/dice.html',
		directives: [NgFor, NgIf]
})
export class Dice {
	currentRoll: string;
	lastRolls: any;
	disabled: boolean;

	//are the dice visible?
	diceHidden: boolean;

	constructor() {
			this.currentRoll = '';
			this.lastRolls = Rolls.find({}, {sort: { createdAt: -1 }, limit: 5 });
			this.disabled = false;
			this.diceHidden = true;
	}

	simpleRoll(sides) {
			this.disabled = true;
			this.currentRoll = '. . . ROLLING! . . .';
			setTimeout(() => {
				let result = (Math.floor((Math.random() * 100)) % sides) + 1;
				this.currentRoll = `${result} (d${sides})`;
				this.disabled = false;
				this.insertRoll(result, sides);
			}, 250);
	}

	clearRolls() {
			this.currentRoll = '';
			Meteor.call('clearRolls');
	}

	toggleDice() {
			this.diceHidden = !this.diceHidden;
	}

	insertRoll(result, sides) {
			Rolls.insert({ result: result, createdAt: Date.now(), sides: sides });
	}

}