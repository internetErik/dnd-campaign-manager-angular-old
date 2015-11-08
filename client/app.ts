/// <reference path="../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';

import {Characters} from 'collections/characters';

import {bootstrap} from 'angular2-meteor';

import {CharacterForm} from 'client/character-form/character-form';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';


@Component({
    selector: 'app'
})
@View({
    templateUrl: 'client/app.html',
    directives: [NgFor, CharacterForm, ROUTER_DIRECTIVES]
})
class App { 
		characters: Mongo.Cursor<Object>;

		constructor() {
			Meteor.subscribe('characters');
			this.characters = Characters.find();
		}
}

bootstrap(App, [ROUTER_PROVIDERS]);