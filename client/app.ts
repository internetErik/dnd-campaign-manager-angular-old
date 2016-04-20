import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component, provide} from 'angular2/core';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} 
	from 'angular2/router';

import {bootstrap} from 'angular2-meteor-auto-bootstrap';

import {Navigation} from './shared/navigation/navigation';
import {DiceHelper} from './shared/dice-helper/dice-helper';
import {CommandPalette} from './shared/command-palette/command-palette';

import {HomePage} from './pages/home-page/home-page';
import {CampaignList} from './pages/campaign-list/campaign-list';
import {CampaignForm} from './pages/campaign-form/campaign-form';
import {ContentCreator} from './pages/content-creator/content-creator';
import {CharacterList} from './pages/character-list/character-list';
import {CharacterForm} from './pages/character-form/character-form';
import {CharacterDetail} from './pages/character-detail/character-detail';
import {BattleList} from './pages/battle-list/battle-list';
import {CombatDisplay} from './pages/combat-display/combat-display';

@Component({
  selector: 'app',
	template: `
	<command-palette></command-palette>
	<div class="bgc-lightgray posf max-width max-height"></div>
	<navigation class="add-shadow"></navigation>
	<div class="mt20 posr">
		<div class="bgc-white p50 grid-container add-shadow">
			<router-outlet></router-outlet>
		</div>
	</div>
	<dice-helper></dice-helper>
	`,
	directives: [ROUTER_DIRECTIVES, Navigation, DiceHelper, CommandPalette]
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