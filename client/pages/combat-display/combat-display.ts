import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Battles} from '../../../lib/collections/battles';
import {RequireUser, InjectUser} from 'meteor-accounts';
import {MeteorComponent} from 'angular2-meteor';
import {BattleForm} from './battle-form/battle-form';
import {CombatInitializer}  from './combat-initializer/combat-initializer';
import {CombatActions} from './combat-actions/combat-actions';
import {CombatPhase} from './combat-phase/combat-phase';

@Component({
	selector: 'combat-display',
	directives: [BattleForm, CombatInitializer, CombatActions, CombatPhase],
	template: `
	<h1>Combat Display</h1>
	<hr>
	<section 
		*ngIf="battle"
		class="p20-0 m20-0">
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
		
		<hr>
		<combat-actions
			[battle]="battle"
			[localControlled]="localControlled"
			(releaseLocalControlled)="releaseCombatant($event)"
			(battleModified)="updateBattle()"></combat-actions>

		<combat-phase
			[battle]="battle"
			[isDM]="currentUser && currentUser._id === campaign.creator"
			(roundResolved)="roundResolved()"></combat-phase>
			
	</section>
	`
})
@RequireUser()
@InjectUser('currentUser')
export class CombatDisplay extends MeteorComponent {
	router: Router;
  currentUser: any;
	campaign: any;
	battleId: string;
	battle: any;
	//characters being controlled by user
	localControlled: any[] = [];

constructor(params: RouteParams, _router: Router) {
		super();
		this.router = _router;
		this.battleId = params.get('battleId');
		this.campaign = Session.get('campaign');

		var handle = this.subscribe('battles', this.campaign._id);
		
		this.autorun(() => {
        if (handle.ready())
          this.battle = Battles.findOne({ _id: this.battleId });	
		}, true);
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

	roundResolved() {
    this.battle.combatPhase = 0;
    this.battle.combatants.forEach((c) => { 
      c.action = '';
      c.actionSubmitted = false; 
      c.initiative = 0;
      if(c.roundsOccupied > 0)
        c.roundsOccupied--;
    });
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
  	console.log(combatant);
    var ndx = this.localControlled.indexOf(combatant);
    if(ndx > -1)
    	this.localControlled.splice(ndx, 1);
  }
}