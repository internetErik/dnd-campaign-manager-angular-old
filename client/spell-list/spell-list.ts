/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View} from 'angular2/angular2';

import {Router} from 'angular2/router';

import {Spells} from 'collections/spells';

@Component({
    selector: 'spell-list',
    inputs: ['characterId']
})
@View({
	templateUrl: 'client/spell-list/spell-list.html',
})
export class SpellList {
	spells: Mongo.Cursor<Object>;

	spellSort: string;
	spellSortDirAZ: number;
	spellSortDirLevel: number;
	spellSortDirSchool: number;

	spellFilterAZ: string;
	spellFilterLevel: number;
	spellFilterSchool: string;

	constructor() {
		this.spellSort = 'level'; //options: 'az', 'level', 'school'
		this.spellSortDirAZ = 1;
		this.spellSortDirLevel = 1;
		this.spellSortDirSchool = 1;
		this.spellFilterAZ = '';
		this.spellFilterLevel = -1;
		this.spellFilterSchool = '';
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
		var queryObj = {},
			sortObj = { sort: { level: 1 } };

		if (this.spellFilterLevel >= 0)
			queryObj.level = this.spellFilterLevel;
		if (this.spellFilterAZ !== '')
			queryObj.name = RegExp(`^${this.spellFilterAZ}`);
		if (this.spellFilterSchool !== '')
			queryObj.school = this.spellFilterSchool;

		if (this.spellSort === 'az')
			sortObj = { sort: { name: this.spellSortDirAZ, level: 1 } };
		else if (this.spellSort === 'level')
			sortObj = { sort: { level: this.spellSortDirLevel, name: 1 } };
		else if (this.spellSort === 'school')
			sortObj = { sort: { school: this.spellSortDirSchool, level: 1 } };

		this.spells = Spells.find(queryObj, sortObj);
	}
}
