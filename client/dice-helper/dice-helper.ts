/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts.d.ts" />

import {Component, NgZone} from 'angular2/core';

import {simpleRoll} from 'lib/dice';

import {Rolls} from 'lib/collections/rolls';

import {InjectUser} from 'meteor-accounts';

import {MeteorComponent} from 'angular2-meteor';

@Component({
    selector: 'dice-helper',
	templateUrl: 'client/dice-helper/dice-helper.html'
})
@InjectUser('currentUser')
export class DiceHelper extends MeteorComponent {
	currentRoll: string = '';
	lastRolls: any;

	rollBonus: number = 0;
	//are the buttons disabled because we are rolling?
	disabled: boolean = false;
	//should these rolls be public or private?
	rollPublic: boolean = true;
	//are the dice visible?
	diceHidden: boolean = true;
	dice: number[] = [2, 4, 6, 8, 10, 12, 20, 100];
	
	//the current user
	currentUser: any;
	//current campaign
	campaign: any;
	//current character
	character: any;

	constructor(zone: NgZone) {
		super();

		this.subscribe('rolls', () => {
			this.lastRolls = Rolls.find({}, { sort: { createdDate: -1 }, limit: 5 });
		});

		Tracker.autorun(() => zone.run(() => {
			this.campaign = Session.get('campaign');
			this.character = Session.get('character');
		}));
	}

	roll(sides) {
		this.disabled = true;
		this.currentRoll = '. . . ROLLING! . . .';
		setTimeout(() => {
			let result = simpleRoll(sides);
			this.currentRoll = `${result + this.rollBonus} (d${sides} + ${this.rollBonus})`;
			this.disabled = false;
			if(this.rollPublic && this.currentUser && this.campaign)
				this.insertRoll(result, sides, this.rollBonus);
		}, 250);
	}

	clearRolls() {
		this.currentRoll = '';
		Meteor.call('clearRolls');
	}

	insertRoll(result, sides, bonus) {
		var roll = { 
			result: result, 
			sides: sides, 
			bonus: bonus, 
			critical: result === sides 
		};

		Meteor.call('insertRoll', roll);
	}
}