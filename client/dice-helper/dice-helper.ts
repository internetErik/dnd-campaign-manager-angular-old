/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts-ui.d.ts" />

import {Component, NgZone} from 'angular2/core';

import {simpleRoll} from 'lib/dice';

import {Rolls} from 'collections/rolls';

import {AccountsUI} from 'meteor-accounts-ui';

@Component({
    selector: 'dice-helper',
	templateUrl: 'client/dice-helper/dice-helper.html'
})
export class DiceHelper {
	currentRoll: string;
	lastRolls: any;
	
	//are the buttons disabled because we are rolling?
	disabled: boolean;

	//should these rolls be public or private?
	rollPublic: boolean;

	//are the dice visible?
	diceHidden: boolean;

	//the current user
	currentUser: any;
	//current campaign
	campaign: any;
	//current character
	character: any;

	dice: number[];

	constructor(zone: NgZone) {
		this.currentRoll = '';
		this.lastRolls = Rolls.find({}, { sort: { createdAt: -1 }, limit: 5 });
		this.rollPublic = true;
		this.disabled = false;
		this.diceHidden = true;

		this.dice = [2, 4, 6, 8, 10, 12, 20, 100];

		Tracker.autorun(() => zone.run(() => {
			this.currentUser = Meteor.user();
			this.campaign = Session.get('campaign');
			this.character = Session.get('character');
		}));
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
			if(this.rollPublic && this.currentUser && this.campaign)
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
		var roll = { 
			result: result, 
			createdAt: Date.now(), 
			sides: sides, 
			bonus: bonus, 
			critical: result === sides 
		};

		Meteor.call('insertRoll', roll);
	}

	togglePublic() {
		this.rollPublic = !this.rollPublic;
	}

}