/// <reference path="../typings/angular2-meteor.d.ts" />

import {Characters} from 'collections/characters';

Meteor.methods({
		'insertCharacter': function(character) {
				Characters.insert(character);
		}
});