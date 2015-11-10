/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {simpleRoll} from 'lib/dice';

import {Rolls} from 'collections/rolls';

@Component({
    selector: 'dice-helper'
})
@View({
		templateUrl: 'client/dice-helper/dice-helper.html',
		directives: [NgFor, NgIf]
})
export class DiceHelper {
		currentRoll: string;
		lastRolls: any;
		disabled: boolean;

		//are the dice visible?
		diceHidden: boolean;

		constructor() {
				this.currentRoll = '';
				this.lastRolls = Rolls.find({}, { sort: { createdAt: -1 }, limit: 5 });
				this.disabled = false;
				this.diceHidden = true;
		}

		roll(sides) {
				var bonusInput: HTMLInputElement =
						<HTMLInputElement>document.querySelector('.js-bonus-to-roll');
				var bonus: number = parseInt(bonusInput.value) || 0;
				this.disabled = true;
				this.currentRoll = '. . . ROLLING! . . .';
				setTimeout(() => {
						let result = simpleRoll(sides);
						this.currentRoll = `${result + bonus} (d${sides} + ${bonus})`;
						this.disabled = false;
						this.insertRoll(result, sides, bonus);
				}, 250);
		}

		clearRolls() {
				this.currentRoll = '';
				Meteor.call('clearRolls');
		}

		toggleDice() {
				this.diceHidden = !this.diceHidden;
		}

		insertRoll(result, sides, bonus) {
				Rolls.insert({ result: result, createdAt: Date.now(), sides: sides, bonus: bonus, critical: result === sides });
		}

}