/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, NgIf, FORM_DIRECTIVES} from 'angular2/angular2';

import {Router} from 'angular2/router';

import {Spells} from 'collections/spells';
import {Skills} from 'collections/skills';
import {Feats} from 'collections/feats';

import {RequireUser} from 'meteor-accounts';

@Component({
    selector: 'content-creator'
})
@View({
		templateUrl: 'client/content-creator/content-creator.html',
		directives: [FORM_DIRECTIVES, NgFor, NgIf]
})
@RequireUser()
export class ContentCreator {
    router: Router;

	spells: Mongo.Cursor<Object>;
	skills: Mongo.Cursor<Object>;
	feats: Mongo.Cursor<Object>;

	newSpellName: string;
	invalidSpellName: boolean;
	newSpellLevel: number;
	newSpellSchool: string;
	newSpellRange: string;
	newSpellDuration: string;
	newSpellComponents: string;
	newSpellCastingTime: string;
	newSpellDescription: string;

	spellSort: string;
	spellSortDirAZ: number;
	spellSortDirLevel: number;
	spellSortDirSchool: number;

	spellFilterAZ: string;
	spellFilterLevel: number;
	spellFilterSchool: string;

	newSkillName: string;
	newSkillStat: string;

	newFeatName: string;
	newFeatDesc: string;

	constructor(_router: Router) {
		this.router = _router;
		this.skills = Skills.find();
		this.feats = Feats.find();

		//spells
		this.invalidSpellName = false;
		this.newSpellSchool = 'Abjuration';
		this.spellSort = 'level'; //options: 'az', 'level', 'school'
		this.spellSortDirAZ = 1;
		this.spellSortDirLevel = -1;
		this.spellSortDirSchool = -1;
		this.spellFilterAZ = '';
		this.spellFilterLevel = -1;
		this.spellFilterSchool = '';
		this.getSpells();

	}

	checkSpellName(e: Event) {
		this.invalidSpellName = Spells.find({ name: this.newSpellName.toLowerCase() }).count() > 0;
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
			sortObj = { sort: { level: this.spellSortDirLevel } };
		else if (this.spellSort === 'school')
			sortObj = { sort: { school: this.spellSortDirSchool, level: 1 } };

		console.dir(queryObj, sortObj);
	
		this.spells = Spells.find(queryObj, sortObj);
	}

	addSpell(e: Event) {
		e.preventDefault();
		if (this.newSpellName && !Spells.findOne({ name: this.newSpellName })) {
			if (this.newSpellLevel && this.newSpellSchool && this.newSpellDescription) {
				let spell = { 
					name        : this.newSpellName.toLowerCase(),
					level       : this.newSpellLevel,
					school      : this.newSpellSchool,
					range       : this.newSpellRange,
					duration    : this.newSpellDuration,
					components  : this.newSpellComponents,
					castingTime : this.newSpellCastingTime,
					description : this.newSpellDescription
				};

				Meteor.call('insertSpell', spell);
				this.newSpellName = '';
				this.newSpellLevel = 0;
				this.newSpellSchool = '';
				this.newSpellDescription = '';
			}
		}
	}

	removeSpell(e: Event, spell) {
		e.preventDefault();
		Meteor.call('removeSpell', spell._id);
	}

	addSkill(e: Event) {
		e.preventDefault();
		if (this.newSkillName && !Skills.findOne({ name: this.newSkillName })) {
			if (this.newSkillStat) {
				let skill = { 
					name: this.newSkillName.toLowerCase(), 
					stat: this.newSkillStat 
				};
				Meteor.call('insertSkill',skill);
				this.newSkillName = '';
				this.newSkillStat = '';
			}
		}
	}

	removeSkill(e: Event, skill) {
		e.preventDefault();
		Meteor.call('removeSkill', skill._id );
	}

	addFeat(e: Event) {
		e.preventDefault();
		if (this.newFeatName && !Feats.findOne({ name: this.newFeatName })) {
			if (this.newFeatDesc) {
				Meteor.call('insertFeat', { 
					name: this.newFeatName.toLowerCase(), 
					description: this.newFeatDesc 
				});
				this.newFeatName = '';
				this.newFeatDesc = '';
			}
		}
	}

	removeFeat(e: Event, feat) {
		e.preventDefault();
		Meteor.call('removeFeat', feat._id );
	}
}