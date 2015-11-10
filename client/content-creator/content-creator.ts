/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, NgIf, FORM_DIRECTIVES} from 'angular2/angular2';

import {Router} from 'angular2/router';

import {Spells} from 'collections/spells';
import {Skills} from 'collections/skills';
import {Feats} from 'collections/feats';

@Component({
    selector: 'content-creator'
})
@View({
		templateUrl: 'client/content-creator/content-creator.html',
		directives: [FORM_DIRECTIVES, NgFor, NgIf]
})
export class ContentCreator {
    router: Router;

		spells: Mongo.Cursor<Object>;
		skills: Mongo.Cursor<Object>;
		feats: Mongo.Cursor<Object>;

		newSpellName: string;
		newSpellLevel: number;
		newSpellDomain: string;
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

		addSpell(e: Event) {
				e.preventDefault();
				if (this.newSpellName && !Spells.findOne({ name: this.newSpellName })) {
						if (this.newSpellLevel && this.newSpellDomain && this.newSpellDescription) {
								let spell = { name: this.newSpellName, level: this.newSpellLevel, domain: this.newSpellDomain, description: this.newSpellDescription, tab: 0 };
								Spells.insert(spell);
								this.newSpellName = '';
								this.newSpellLevel = 0;
								this.newSpellDomain = '';
								this.newSpellDescription = '';
						}
				}
		}

		removeSpell(e: Event, spell) {
				e.preventDefault();
				Spells.remove({ _id: spell._id });
		}

		addSkill(e: Event) {
				e.preventDefault();
				if (this.newSkillName && !Skills.findOne({ name: this.newSkillName })) {
						if (this.newSkillStat) {
								let skill = { name: this.newSkillName, stat: this.newSkillStat };
								Skills.insert(skill);
								this.newSkillName = '';
								this.newSkillStat = '';
						}
				}
		}

		removeSkill(e: Event, skill) {
				e.preventDefault();
				Skills.remove({ _id: skill._id });
		}

		addFeat(e: Event) {
				e.preventDefault();
				if (this.newFeatName && !Feats.findOne({ name: this.newFeatName })) {
						if (this.newFeatDesc) {
								Feats.insert({ name: this.newFeatName, description: this.newFeatDesc });
								this.newFeatName = '';
								this.newFeatDesc = '';
						}
				}
		}

		removeFeat(e: Event, feat) {
				e.preventDefault();
				Feats.remove({ _id: feat._id });
		}
}