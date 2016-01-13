import {Component, NgZone} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Battles} from 'lib/collections/battles';

import {RequireUser} from 'meteor-accounts';
import {MeteorComponent} from 'angular2-meteor';
import {BattleForm}
	from 'client/pages/combat-display/battle-form/battle-form';
import {CombatInitializer} 
	from 'client/pages/combat-display/combat-initializer/combat-initializer';
import {CombatActions}
	from 'client/pages/combat-display/combat-actions/combat-actions';

@Component({
	selector: 'combat-display',
	directives: [BattleForm, CombatInitializer, CombatActions],
	template: `
	<h1>Combat Display</h1>
	<hr>
	<section class="p20-0 m20-0" *ngIf="battle">

		<battle-form 
			[battle]="battle"
			(nameUpdated)="updateName($event)"
			(battleDeleted)="deleteBattle()"></battle-form>

		<combat-initializer
			[localControlled]="localControlled"
			[combatants]="battle.combatants"
			(combatantsAdded)="addCombatants($event)"
			(removeCombatant)="removeCombatant($event)"
			(startTriggered)="startBattle()"
	    (combatantControlled)="controlCombatant($event)"
	    (combatantReleased)="releaseCombatant($event)"></combat-initializer>
	</section>
		
	<div *ngIf="battle">
		<hr *ngIf="battle.combatPhase !== -1">
		<combat-actions
			[battle]="battle"
			[localControlled]="localControlled"
			(battleModified)="updateBattle()"></combat-actions>
	</div>
	`
})
@RequireUser()
export class CombatDisplay extends MeteorComponent {
	router: Router;
	
	battleId: string;
	campaign: any;

	battle: any;
	localControlled: any[] = [];
	
	constructor(zone: NgZone, params: RouteParams, _router: Router) {
		super();
		this.router = _router;

		this.battleId = params.get('battleId');
		this.campaign = Session.get('campaign');
		
		var handle = this.subscribe('battles');

		Tracker.autorun(() => zone.run(() => {
			if(handle.ready())
				if (this.campaign)
					this.battle = Battles.findOne({ _id: this.battleId });
				else
					this.router.parent.navigate(['/CampaignList']);
		}));
	}

	updateName(name) {
		this.battle.name = name;
		this.updateBattle();
	}

	deleteBattle() {
		this.router.parent.navigate(['/BattleList']);
		Meteor.call('removeBattle', this.battle._id);
	}

	addCombatants(combatants) {
		this.battle.combatants = this.battle.combatants.concat(combatants);
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

  controlCombatant(combatant) {
    this.localControlled.push(combatant);
  }

  releaseCombatant(combatant) {
    var i = this.localControlled.indexOf(combatant)
    if(i > -1)
    	this.localControlled.splice(i, 1);
  }
}