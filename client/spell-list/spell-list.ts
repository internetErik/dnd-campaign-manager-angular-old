/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component} from 'angular2/core';

import {Spells} from 'lib/collections/spells';

import {MeteorComponent} from 'angular2-meteor';

@Component({
    selector: 'spell-list',
    inputs: ['characterId'],
	templateUrl: 'client/spell-list/spell-list.html'
})
export class SpellList extends MeteorComponent {
	spells: Mongo.Cursor<Object>;

	spellSort: string = 'level';//options: 'az', 'level', 'school'
	spellSortDirAZ: number = 1;
	spellSortDirLevel: number = 1;
	spellSortDirSchool: number = 1;

	spellFilterAZ: string = '';
	spellFilterLevel: number = -1;
	spellFilterSchool: string = '';

	constructor() {
		super();
		this.getSpells();
	}

	sortSpellAZ() {
		if (this.spellSort === 'az')
			this.spellSortDirAZ = this.spellSortDirAZ * (-1);
		else {
			this.spellSort = 'az';
			this.spellSortDirAZ = 1;
		}

		this.getSpells();
	}

	sortSpellLevel() {
		if (this.spellSort === 'level')
			this.spellSortDirLevel = this.spellSortDirLevel * (-1);
		else {
			this.spellSort = 'level';
			this.spellSortDirLevel = 1;
		}

		this.getSpells();
	}

	sortSpellSchool() {
		if (this.spellSort === 'school')
			this.spellSortDirSchool = this.spellSortDirSchool * (-1);
		else {
			this.spellSort = 'school';
			this.spellSortDirSchool = 1;
		}

		this.getSpells();
	}

	filterSpellAZ(az: string) {
		this.spellFilterAZ = az;
		this.getSpells();
	}

	filterSpellLevel(level: number) {
		this.spellFilterLevel = level;
		this.getSpells();
	}

	filterSpellSchool(school: string) {
		this.spellFilterSchool = school;
		this.getSpells();
	}

	getSpells() {
		this.subscribe('spells', () => { 
			this.spells = Spells.find(this.buildQuery(), this.buildSort());
		}, true);
	}

	buildQuery(): Object {
		var queryObj: any = {};

		if (this.spellFilterLevel >= 0)
			queryObj.level = this.spellFilterLevel;
		if (this.spellFilterAZ !== '')
			queryObj.name = RegExp(`^${this.spellFilterAZ}`);
		if (this.spellFilterSchool !== '')
			queryObj.school = this.spellFilterSchool;

		return queryObj;
	}

	buildSort(): Object {
		var sortObj: any = { sort: { level: 1 } };

		if (this.spellSort === 'az')
			sortObj = { sort: { name: this.spellSortDirAZ, level: 1 } };
		else if (this.spellSort === 'level')
			sortObj = { sort: { level: this.spellSortDirLevel, name: 1 } };
		else if (this.spellSort === 'school')
			sortObj = { sort: { school: this.spellSortDirSchool, level: 1 } };

		return sortObj;

	}
}
