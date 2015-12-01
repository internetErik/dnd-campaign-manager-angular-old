/// <reference path="../typings/angular2-meteor.d.ts" />
/// <reference path="../typings/meteor-accounts-ui.d.ts" />

import {Component, View, provide} from 'angular2/angular2';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF, Router} 
	from 'angular2/router';

import {bootstrap} from 'angular2-meteor';

import {Navigation} from 'client/navigation/navigation';

import {HomePage} from 'client/home-page/home-page';
import {CampaignList} from 'client/campaign-list/campaign-list';
import {CampaignForm} from 'client/campaign-form/campaign-form';
import {ContentCreator} from 'client/content-creator/content-creator';

import {CharacterList} from 'client/character-list/character-list';
import {CharacterForm} from 'client/character-form/character-form';
import {CharacterDetail} from 'client/character-detail/character-detail';
import {BattleList} from 'client/battle-list/battle-list';
import {CombatDisplay} from 'client/combat-display/combat-display';


import {DiceHelper} from 'client/dice-helper/dice-helper';

@Component({
    selector: 'app'
})
@View({
	template: `
	<div class="bgc-lightgray posf z0 max-width max-height"></div>
	<navigation></navigation>
	<div class="mt20 posr">
		<div class="bgc-white p50 grid-container add-shadow">
			<router-outlet></router-outlet>
		</div>
	</div>
	<dice-helper></dice-helper>
	`,
	directives: [ROUTER_DIRECTIVES, Navigation, DiceHelper]
})
@RouteConfig([
	{
		path: '/',
		redirectTo: 'HomePage'
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
		path: '/battle',
		as: 'BattleList',
		component: BattleList
	},
	{
		path: '/battle/:battleId',
		as: 'CombatDisplay',
		component: CombatDisplay
	}
])
class App { 
	constructor() {		
		Meteor.subscribe('userData');
		Meteor.subscribe('campaigns');
		Meteor.subscribe('characters');
		Meteor.subscribe('spells');
		Meteor.subscribe('skills');
		Meteor.subscribe('feats');
		Meteor.subscribe('rolls');
	}
}
bootstrap(App, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);