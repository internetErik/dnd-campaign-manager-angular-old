/// <reference path="../../../typings/angular2-meteor.d.ts" />

import {Component, EventEmitter} from 'angular2/core';

@Component({
    selector: 'skill-list',
    inputs: ['skills', 'skillsSelectable', 'skillsRemovable'],
    outputs: ['skillSelected', 'skillRemoved'],
	templateUrl: 'client/components/skill-list/skill-list.html'
})
export class SkillList {
	skills: Mongo.Cursor<Object>;
	skillsSelectable: boolean;
	skillsRemoveable: boolean;

	skillSelected: EventEmitter<any> = new EventEmitter();
	skillRemoved: EventEmitter<any> = new EventEmitter();

	removeSkill(e: Event, skill) {
		e.preventDefault();
		this.skillRemoved.emit(skill);
	}

	selectSkill(e: Event, skill) {
		e.preventDefault();
		this.skillSelected.emit(skill);
	}
}