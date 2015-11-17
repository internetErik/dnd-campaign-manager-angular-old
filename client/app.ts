/// <reference path="../typings/angular2-meteor.d.ts" />
/// <reference path="../typings/meteor-accounts-ui.d.ts" />

import {Component, View, NgIf, NgZone, provide} from 'angular2/angular2';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF, Router} 
	from 'angular2/router';

import {bootstrap} from 'angular2-meteor';

import {HomePage} from 'client/home-page/home-page';
import {CampaignList} from 'client/campaign-list/campaign-list';
import {CampaignForm} from 'client/campaign-form/campaign-form';
import {ContentCreator} from 'client/content-creator/content-creator';

import {CharacterList} from 'client/character-list/character-list';
import {CharacterForm} from 'client/character-form/character-form';
import {CharacterDetail} from 'client/character-detail/character-detail';
import {CombatDisplay} from 'client/combat-display/combat-display';


import {DiceHelper} from 'client/dice-helper/dice-helper';
import {AccountsUI} from 'meteor-accounts-ui';

@Component({
    selector: 'app'
})
@View({
	template: `
	<nav class="h70 posr p0-50 heading5">
		<div class="vertical-align" *ng-if="user">
		<a class="tdn" [router-link]="['/HomePage']">Home</a> |
		<a class="tdn" [router-link]="['/CampaignList']">Campaigns</a> |
		<a class="tdn" [router-link]="['/ContentCreator']">Content Creator</a> |
		<a class="tdn" [router-link]="['/CharacterList']">All Characters</a> |
		<a class="tdn" [router-link]="['/CombatDisplay']">Combat Display</a>
		</div>
	</nav>
	<accounts-ui></accounts-ui>
	<div class="sub-menu bgc-lightgray posr p0-50 heading5 h50">
		<span *ng-if="user && campaign" class="vertical-align dib">
		Playing: {{campaign.name}}
		<button (click)="unselectCampaign()">&times;</button> >
		<a class="tdn" [router-link]="['/CharacterList', {campaignId: campaign._id}]">Characters</a> |
		<a class="tdn" [router-link]="['/CombatDisplay', {campaignId: campaign._id}]">Combat Display</a> 
		</span>
		<span *ng-if="!campaign" class="vertical-align dib">
			No Campaign Selected.
		</span>
	</div>
	<div class="p0-50 pt50">
	<router-outlet></router-outlet>
	</div>
	<dice-helper></dice-helper>
	`,
	directives: [ROUTER_DIRECTIVES, NgIf, DiceHelper, AccountsUI]
})
@RouteConfig([
	{
		path: '/',
		as: 'HomePage',
		component: HomePage
	},
	{
		path: '/campaign',
		as: 'CampaignList',
		component: CampaignList
	},
    {
		path: '/campaign/add',
		as: 'CampaignForm',
		component: CampaignForm
    },
    {
		path: '/content-create',
		as: 'ContentCreator',
		component: ContentCreator
    },
	{
		path: '/character',
		as: 'CharacterList',
		component: CharacterList
	},
	{
		path: '/character/add',
		as: 'CharacterForm',
		component: CharacterForm
	},
	{
		path: '/character/:characterId',
		as: 'CharacterDetail',
		component: CharacterDetail
	},
	{
		path: '/combat',
		as: 'CombatDisplay',
		component: CombatDisplay
	}
])
class App { 
	user: any;
	campaign: any;
	router: Router;

	constructor(zone: NgZone, _router: Router) {
		this.router = _router;
		
		Tracker.autorun(() => zone.run(() => {
			this.user = Meteor.user();
			this.campaign = (this.user) ? Session.get('campaign') : null;

		}));

		Meteor.subscribe('campaigns');
		Meteor.subscribe('characters');
		Meteor.subscribe('spells');
		Meteor.subscribe('skills');
		Meteor.subscribe('feats');
		Meteor.subscribe('rolls');
	}

	unselectCampaign() {
		Session.set('campaign', null);
		this.router.navigate(['/CampaignList']);
	}
}
bootstrap(App, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);