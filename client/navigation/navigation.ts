/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts-ui.d.ts" />

import {Component, View, NgZone} from 'angular2/angular2';

import {RouterLink, Router} from 'angular2/router';

import {AccountsUI} from 'meteor-accounts-ui';

@Component({
    selector: 'navigation'
})
@View({
	template: `
	<nav class="h70 posr p0-50 heading5">
		<div class="vertical-align" *ng-if="currentUser">
		<a class="tdn" [router-link]="['/HomePage']">Home</a> |
		<a class="tdn" [router-link]="['/CampaignList']">Campaigns</a> |
		<a class="tdn" [router-link]="['/ContentCreator']">Content Creator</a>
		<span *ng-if="currentUser.dm"> |
		<a class="tdn" [router-link]="['/CharacterList']">All Characters</a>
		</span>
		</div>
	</nav>
	<accounts-ui></accounts-ui>
	<div class="sub-menu bgc-lightgray posr p0-50 heading5 h50">
		<span *ng-if="currentUser && campaign" class="vertical-align dib">
		Playing: {{campaign.name}}
		<button (click)="unselectCampaign()">&times;</button>
		<span *ng-if="character">
			as 
			<a class="tdn" [router-link]="['/CharacterDetail', {characterId: character._id}]">{{ character.firstName }}</a>
			<button (click)="unselectCharacter()">&times;</button>
		</span>
		>
		<a class="tdn" [router-link]="['/CharacterList', {campaignId: campaign._id}]">Characters</a> |
		<a class="tdn" [router-link]="['/BattleList']">Battle List</a>
		</span>
		<span *ng-if="!campaign" class="vertical-align dib">
			No Campaign Selected.
		</span>
	</div>
	`,
	directives: [RouterLink, AccountsUI]
})
export class Navigation {
	currentUser: any;
	campaign: any;
	character: any;
	router: Router;

	constructor(_router: Router, zone: NgZone) {
		this.router = _router;
		Tracker.autorun(() => zone.run(() => {
			this.currentUser = Meteor.user();
			this.campaign = (this.currentUser) ? Session.get('campaign') : null;
			this.character = Session.get('character');
		}));
	}

	unselectCampaign() {
		Session.set('character', null);
		Session.set('campaign', null);
		this.router.navigate(['/CampaignList']);
	}

	unselectCharacter() {
		Session.set('character', null);
		this.router.navigate(['/CharacterList', {campaignId: this.campaign._id}]);
	}
}