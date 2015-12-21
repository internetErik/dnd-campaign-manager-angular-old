/// <reference path="../../../typings/angular2-meteor.d.ts" />

import {Component, EventEmitter} from 'angular2/core';

@Component({
    selector: 'spell-list',
    inputs: ['spells', 'spellsSelectable', 'spellsRemovable'],
    outputs: ['spellSelected', 'spellRemoved'],
	templateUrl: 'client/components/spell-list/spell-list.html'
})
export class SpellList {
	spells: Mongo.Cursor<Object>;
	spellsSelectable: boolean;
	spellsRemoveable: boolean;

	spellSelected: EventEmitter<any> = new EventEmitter();
	spellRemoved: EventEmitter<any> = new EventEmitter();

	removeSpell(e: Event, spell) {
		e.preventDefault();
		this.spellRemoved.emit(spell);
	}

	selectSpell(e: Event, spell) {
		e.preventDefault();
		this.spellSelected.emit(spell);
	}
}