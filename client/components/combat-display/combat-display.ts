import {Component, NgZone} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {simpleRoll} from 'lib/dice';

import {Battles} from 'lib/collections/battles';

import {RequireUser} from 'meteor-accounts';

import {MeteorComponent} from 'angular2-meteor';

import {CombatInitializer} 
	from 'client/components/combat-initializer/combat-initializer';
import {CombatActionInput} 
	from 'client/components/combat-action-input/combat-action-input';

@Component({
	selector: 'combat-display',
	directives: [CombatInitializer, CombatActionInput],
	templateUrl: 'client/components/combat-display/combat-display.html'
})
@RequireUser()
export class CombatDisplay extends MeteorComponent {
	// combat phases
	//-1 = not started
	// 0 = decide action
	// 1 = roll init
	// 2 = resolve round
	router: Router;
	
	battleId: string;
	campaign: any;

	battle: any;
	
	constructor(zone: NgZone, params: RouteParams, _router: Router) {
		super();

		this.battleId = params.get('battleId');
		
		this.router = _router;

		Tracker.autorun(() => zone.run(() => {
			this.campaign = Session.get('campaign');
		}));

		this.subscribe('battles', () => { 
			if (this.campaign)
				this.battle = Battles.findOne({ _id: this.battleId });
			else
				this.router.parent.navigate(['/CampaignList']);
		}, true);
	}

	updateName() {
		if(this.battle.name != '')
			this.updateBattle();
	}

	deleteBattle() {
		Meteor.call('removeBattle', this.battle._id);
		this.router.parent.navigate(['/BattleList']);
	}

	addCombatants(combatants: any[]) {
		this.battle.combatants = this.battle.combatants.concat(combatants);
		this.updateBattle();
	}

	removeCombatant(character) {
		var i = this.battle.combatants.indexOf(character);
		if (i > -1) {
			this.battle.combatants.splice(i, 1);
			this.updateBattle();
		}
	}

	startBattle() {
		if (this.battle.combatants.length > 1) {
			this.battle.combatPhase = 0;
			this.updateBattle();
		}
	}

	endBattle() {
		Meteor.call('finishBattle', this.battle._id);
	}

	updateBattle() {
		Meteor.call('updateBattle', this.battle._id, this.battle);
	}

	submitAction(action: string, combatant: any) {
		//combat phase will be advanced on server if this is the last action 
		//we are waiting on
		if (!combatant.actionSubmitted) {
			combatant.action = action;
			combatant.actionSubmitted = true;
			this.updateBattle();
		}
	}

	unsubmitAction(combatant: any) {
		combatant.action = null;
		combatant.actionSubmitted = false;
		this.updateBattle();
	}

	rollInitiative() {
		this.battle.combatants = this.battle.combatants
		.map((c) => { 
			c.initiative = (c.roundsOccupied > 0) ?
				0 : simpleRoll(100) + (c.bonus || 0);
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
		this.battle.combatPhase = 2;
		this.updateBattle();
	}

	resolveRound() {
		this.battle.combatPhase = 0;
		this.battle.combatants.forEach((c) => { 
			c.action = '';
			c.actionSubmitted = false; 
			c.initiative = 0;
			if(c.roundsOccupied > 0)
				c.roundsOccupied--;
		});
		this.updateBattle();
	}
}