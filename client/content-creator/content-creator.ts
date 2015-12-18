/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts.d.ts" />

import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {Spells} from 'lib/collections/spells';
import {Skills} from 'lib/collections/skills';
import {Feats} from 'lib/collections/feats';

import {SpellList} from 'client/spell-list/spell-list';

import {MonsterForm} from 'client/monster-form/monster-form';

import {RequireUser, InjectUser} from 'meteor-accounts';

@Component({
    selector: 'content-creator',
	templateUrl: 'client/content-creator/content-creator.html',
	directives: [SpellList, MonsterForm]
})
@RequireUser()
@InjectUser('currentUser')
export class ContentCreator {
    router: Router;

	spells: Mongo.Cursor<Object>;
	skills: Mongo.Cursor<Object>;
	feats: Mongo.Cursor<Object>;

	currentTab: string;

	newSpellName: string;
	invalidSpellName: boolean;
	newSpellLevel: number;
	newSpellSchool: string;
	newSpellRange: string;
	newSpellDuration: string;
	newSpellComponents: string;
	newSpellCastingTime: string;
	newSpellDescription: string;

	newSkillName: string;
	newSkillStat: string;

	newFeatName: string;
	newFeatPrerequisite: string;
	newFeatBenefit: string;
	newFeatNormal: string;
	newFeatSpecial: string;

	constructor(_router: Router) {
		this.router = _router;
		this.skills = Skills.find();
		this.feats = Feats.find();

		this.currentTab = 'spells';
		
		//for adding a new spell
		this.invalidSpellName = false;
		this.newSpellSchool = 'Abjuration';
	}

	checkSpellName(e: Event) {
		this.invalidSpellName = Spells.find({ name: this.newSpellName.toLowerCase() }).count() > 0;
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
			if (this.newFeatBenefit) {
				Meteor.call('insertFeat', { 
					name: this.newFeatName.toLowerCase(), 
					prerequisite: this.newFeatPrerequisite,
					benefit: this.newFeatBenefit,
					normal: this.newFeatNormal,
					special: this.newFeatSpecial
				});
				this.newFeatName = '';
				// this.newFeatDesc = '';
			}
		}
	}

	removeFeat(e: Event, feat) {
		e.preventDefault();
		Meteor.call('removeFeat', feat._id );
	}
}