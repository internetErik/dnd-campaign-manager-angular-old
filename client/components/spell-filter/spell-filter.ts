import 'reflect-metadata';
import {Component, EventEmitter} from 'angular2/core';

@Component({
	selector: 'spell-filter',
	templateUrl: 'client/components/spell-filter/spell-filter.html',
	inputs: ['spells'],
	outputs: ['sortChanged', 'filterChanged']
})
export class SpellFilter { 
	spells: Mongo.Cursor<Object>;

	sortChanged: EventEmitter<any> = new EventEmitter();
	filterChanged: EventEmitter<any> = new EventEmitter();

	spellSort: string = 'level';//options: 'az', 'level', 'school'
	spellSortDirAZ: number = 1;
	spellSortDirLevel: number = 1;
	spellSortDirSchool: number = 1;

	spellFilterAZ: string = '';
	spellFilterLevel: number = -1;
	spellFilterSchool: string = '';

	constructor() {
		this.buildQuery();
		this.buildSort();
	}

	sortSpellAZ() {
		if (this.spellSort === 'az')
			this.spellSortDirAZ = this.spellSortDirAZ * (-1);
		else {
			this.spellSort = 'az';
			this.spellSortDirAZ = 1;
		}
		this.buildSort();
	}

	sortSpellLevel() {
		if (this.spellSort === 'level')
			this.spellSortDirLevel = this.spellSortDirLevel * (-1);
		else {
			this.spellSort = 'level';
			this.spellSortDirLevel = 1;
		}
		this.buildSort();
	}

	sortSpellSchool() {
		if (this.spellSort === 'school')
			this.spellSortDirSchool = this.spellSortDirSchool * (-1);
		else {
			this.spellSort = 'school';
			this.spellSortDirSchool = 1;
		}
		this.buildSort();
	}

	filterSpellAZ(az: string) {
		this.spellFilterAZ = az;
		this.buildQuery();
	}

	filterSpellLevel(level: number) {
		this.spellFilterLevel = level;
		this.buildQuery();
	}

	filterSpellSchool(school: string) {
		this.spellFilterSchool = school;
		this.buildQuery();
	}

	buildSort() {
		var sortObj: any = { sort: { level: 1 } };

		if (this.spellSort === 'az')
			sortObj = { sort: { name: this.spellSortDirAZ, level: 1 } };
		else if (this.spellSort === 'level')
			sortObj = { sort: { level: this.spellSortDirLevel, name: 1 } };
		else if (this.spellSort === 'school')
			sortObj = { sort: { school: this.spellSortDirSchool, level: 1 } };

		this.sortChanged.emit(sortObj);
	}

	buildQuery() {
		var queryObj: any = {};

		if (this.spellFilterAZ !== '')
			queryObj.name = RegExp(`^${this.spellFilterAZ}`);

		if (this.spellFilterLevel >= 0)
			queryObj.level = this.spellFilterLevel;
		
		if (this.spellFilterSchool !== '')
			queryObj.school = this.spellFilterSchool;

		this.filterChanged.emit(queryObj);
	}
}