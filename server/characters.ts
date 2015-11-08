/// <reference path="../typings/angular2-meteor.d.ts" />

import {Characters} from 'collections/characters';

Meteor.publish('characters', function() {
		return Characters.find();
});