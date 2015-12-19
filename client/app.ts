/// <reference path="../typings/angular2-meteor.d.ts" />

import {Component, provide} from 'angular2/core';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} 
	from 'angular2/router';

import {bootstrap} from 'angular2-meteor';

import {Navigation} from 'client/components/navigation/navigation';

import {HomePage} from 'client/components/home-page/home-page';
import {CampaignList} from 'client/components/campaign-list/campaign-list';
import {CampaignForm} from 'client/components/campaign-form/campaign-form';
import {ContentCreator} from 'client/components/content-creator/content-creator';

import {CharacterList} from 'client/components/character-list/character-list';
import {CharacterForm} from 'client/components/character-form/character-form';
import {CharacterDetail} from 'client/components/character-detail/character-detail';
import {BattleList} from 'client/components/battle-list/battle-list';
import {CombatDisplay} from 'client/components/combat-display/combat-display';


import {DiceHelper} from 'client/components/dice-helper/dice-helper';

@Component({
    selector: 'app',
	template: `
	<div class="bgc-lightgray posf max-width max-height"></div>
	<navigation class="add-shadow"></navigation>
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
		name: 'HomePage',
		component: HomePage,
		useAsDefault: true
	},
	{
		path: '/campaign',
		name: 'CampaignList',
		component: CampaignList
	},
    {
		path: '/campaign/add',
		name: 'CampaignForm',
		component: CampaignForm
    },
    {
		path: '/content-create',
		name: 'ContentCreator',
		component: ContentCreator
    },
	{
		path: '/character',
		name: 'CharacterList',
		component: CharacterList
	},
	{
		path: '/character/add',
		name: 'CharacterForm',
		component: CharacterForm
	},
	{
		path: '/character/:characterId',
		name: 'CharacterDetail',
		component: CharacterDetail
	},
	{
		path: '/battle',
		name: 'BattleList',
		component: BattleList
	},
	{
		path: '/battle/:battleId',
		name: 'CombatDisplay',
		component: CombatDisplay
	}
])
class App {}
bootstrap(App, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);