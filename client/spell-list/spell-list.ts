/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component} from 'angular2/core';

import {Spells} from 'lib/collections/spells';

import {MeteorComponent} from 'angular2-meteor';

@Component({
    selector: 'spell-list',
    inputs: ['spells'],
	templateUrl: 'client/spell-list/spell-list.html'
})
export class SpellList {
	spells: Mongo.Cursor<Object>;
}