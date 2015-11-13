/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts-ui.d.ts" />

import {Component, View, NgIf, NgZone, provide} from 'angular2/angular2';

import {CampaignHome} from 'client/campaign-app/campaign-home/campaign-home';
import {CharacterList} from 'client/campaign-app/character-list/character-list';
import {CharacterForm} from 'client/campaign-app/character-form/character-form';
import {CharacterDetail} from 'client/campaign-app/character-detail/character-detail';
import {CombatDisplay} from 'client/campaign-app/combat-display/combat-display';

import {Campaigns} from 'collections/campaigns';

import {RouteConfig, RouterOutlet, RouteParams, Router, RouterLink} from 'angular2/router';

@Component({
		selector: 'campaign-home'
})
@View({
		template: `
			<div>
			id: {{campaignId}}
			<a [router-link]="['./CharacterList', { campaignId: campaignId }]">Characters</a> |
			<a [router-link]="['./CombatDisplay', { campaignId: campaignId }]">Combat Display</a>
			</div>
			<router-outlet></router-outlet>
		`,
		directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
		{
			path: '/',
			redirectTo: '/CampaignHome'
		},
		{
				path: '/home',
				as: 'CampaignHome',
				component: CampaignHome
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
export class CampaignApp {
		campaignId: string;
		router: Router;

		constructor(_router: Router, params: RouteParams) {
				this.campaignId = params.get('campaignId');
				console.log('sub-home campaignId: ', this.campaignId);
				this.campaign = Campaigns.findOne({ _id: this.campaignId });
		}
}