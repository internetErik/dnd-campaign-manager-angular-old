/// <reference path="../typings/angular2-meteor.d.ts" />
/// <reference path="../typings/meteor-accounts-ui.d.ts" />

import {Component, View, NgFor, provide} from 'angular2/angular2';

import {bootstrap} from 'angular2-meteor';

import {HomePage} from 'client/home-page/home-page';

import {CharacterList} from 'client/character-list/character-list';

import {CharacterForm} from 'client/character-form/character-form';

import {CharacterDetail} from 'client/character-detail/character-detail';

import {CombatDisplay} from 'client/combat-display/combat-display';

import {ContentCreator} from 'client/content-creator/content-creator';

import {DiceHelper} from 'client/dice-helper/dice-helper';

import {AccountsUI} from 'meteor-accounts-ui';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';


@Component({
    selector: 'app'
})
@View({
		template: `
		<nav>
			<a [router-link]="['/HomePage']">Home</a> |
			<a [router-link]="['/CharacterList']">Characters</a> |
			<a [router-link]="['/CombatDisplay']">Combat Display</a> |
			<a [router-link]="['/ContentCreator']">Content Creator</a>
			<accounts-ui></accounts-ui>
		</nav>
		<router-outlet></router-outlet>
		<dice-helper></dice-helper>
		`,
		directives: [ROUTER_DIRECTIVES, DiceHelper, AccountsUI]
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
    },
    {
				path: '/create',
				as: 'ContentCreator',
				component: ContentCreator
    }
])
class App { 
		constructor() {
			Meteor.subscribe('campaigns');
			Meteor.subscribe('characters');
			Meteor.subscribe('spells');
			Meteor.subscribe('skills');
			Meteor.subscribe('feats');
			Meteor.subscribe('rolls');
	}
}
bootstrap(App, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);