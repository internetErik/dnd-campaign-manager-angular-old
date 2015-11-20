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
		newFeatDesc: string;

		constructor(_router: Router) {
				this.router = _router;
				this.spells = Spells.find();
				this.skills = Skills.find();
				this.feats = Feats.find();
		}

		checkSpellName(e: Event) {
			console.log(e);
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