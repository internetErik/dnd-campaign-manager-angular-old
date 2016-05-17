import 'zone.js/dist/zone';
import 'reflect-metadata';
import {Component, provide} from '@angular/core';
import {ROUTER_PROVIDERS, 
				ROUTER_DIRECTIVES, 
				Routes}							from '@angular/router';
import {APP_BASE_HREF} 			from '@angular/common';
import {bootstrap} 					from 'angular2-meteor-auto-bootstrap';
import {Navigation} 				from './shared/navigation/navigation';
import {DiceHelper} 				from './shared/dice-helper/dice-helper';
import {CommandPalette} 		from './shared/command-palette/command-palette';
import {HomePage} 					from './pages/home-page/home-page';
import {CampaignList} 			from './pages/campaign-list/campaign-list';
import {CampaignForm} 			from './pages/campaign-form/campaign-form';
import {ContentCreator} 		from './pages/content-creator/content-creator';
import {CharacterList} 			from './pages/character-list/character-list';
import {CharacterForm} 			from './pages/character-form/character-form';
import {CharacterDetail} 		from './pages/character-detail/character-detail';
import {BattleList} 				from './pages/battle-list/battle-list';
import {CombatDisplay} 			from './pages/combat-display/combat-display';
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
@Routes([
	{
		path: '/',
		component: HomePage
	},
	{
		path: '/campaign',
		component: CampaignList
	},{
		path: '/campaign/add',
		component: CampaignForm
    },
    {
		path: '/content-create',
		component: ContentCreator
    },
	{
		path: '/character',
		component: CharacterList
	},{
			path: '/character/add',
			component: CharacterForm
		},
		{
			path: '/character/:characterId',
			component: CharacterDetail
		},
	{
		path: '/battle',
		component: BattleList
	},{
			path: '/battle/:battleId',
			component: CombatDisplay
		}
])
class App {}
bootstrap(App, [ROUTER_PROVIDERS]);