/// <reference path="../typings/angular2-meteor.d.ts" />
/// <reference path="../typings/meteor-accounts-ui.d.ts" />

import {Component, View, NgIf, NgZone, provide} from 'angular2/angular2';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';

import {bootstrap} from 'angular2-meteor';

import {HomePage} from 'client/home-page/home-page';
import {CampaignList} from 'client/campaign-list/campaign-list';
import {CampaignApp} from 'client/campaign-app/campaign-app';
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
		<nav>
			<span *ng-if="user">
			<a [router-link]="['/HomePage']">Home</a> |
			<a [router-link]="['/CampaignList']">Campaigns</a> |
			<a [router-link]="['/ContentCreator']">Content Creator</a> |
			<a [router-link]="['/CharacterList']">Characters</a> |
			<a [router-link]="['/CombatDisplay']">Combat Display</a> |
			</span>
			<accounts-ui></accounts-ui>
		</nav>
		<div class="sub-menu" *ng-if="campaign">
			Campaign: {{campaign.name}}
			<a [router-link]="['/CharacterList', {campaignId: campaign._id}]">Characters</a> |
			<a [router-link]="['/CombatDisplay', {campaignId: campaign._id}]">Combat Display</a> 
			<button (click)="unselectCampaign()">unselect</button>
		</div>
		<router-outlet></router-outlet>
		<dice-helper></dice-helper>
		`,
		directives: [ROUTER_DIRECTIVES, NgIf, DiceHelper, AccountsUI]
})
@RouteConfig([
		{
			path: '/',
			redirectTo: '/HomePage'
		},
		{
			path: '/home',
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
		constructor(zone: NgZone) {

			Tracker.autorun(() => zone.run(() => {
				this.user = Meteor.user();
				this.campaign = Session.get('campaign');
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
		}
}
bootstrap(App, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);