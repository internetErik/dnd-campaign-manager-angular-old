/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';

import {Characters} from 'collections/characters';

import {RouterLink} from 'angular2/router';

@Component({
    selector: 'character-list'
})
@View({
    templateUrl: 'client/character-list/character-list.html',
    directives: [NgFor, RouterLink]
})
export class CharacterList {
		characters: Mongo.Cursor<Object>;

		constructor() {
				this.characters = Characters.find();
		}
}