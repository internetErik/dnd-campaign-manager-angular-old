/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, NgIf, FORM_DIRECTIVES} from 'angular2/angular2';

import {RouteParams, Router} from 'angular2/router';

import {Characters} from 'collections/characters';

@Component({
    selector: 'character-detail'
})
@View({
    templateUrl: 'client/character-detail/character-detail.html',
    directives: [FORM_DIRECTIVES, NgFor, NgIf]
})
export class CharacterDetail {
    character: any;
    router: Router;

		newSpellName: string;
		newSpellLevel: number;
		newSpellDomain: string;
		newSpellDescription: string;

		newSkillName: string;
		newSkillStat: string;
		newSkillLevel: number;

		newFeatName: string;
		newFeatDesc: string;

		constructor(_router: Router, params: RouteParams) {
        var characterId = params.get('characterId');
        this.character = Characters.findOne({ _id: characterId });
        this.router = _router;

				this.newSpellName = '';
				this.newSpellLevel = 0;
				this.newSpellDomain = '';
				this.newSpellDescription = '';
				
				this.newSkillName = '';
				this.newSkillStat = '';
				this.newSkillLevel = 0;

				this.newFeatName = '';
    }

    deleteCharacter() {
			if(confirm(`Are you sure you want to delete this character?`)) {
				Characters.remove({ _id: this.character._id });
				this.router.parent.navigate(['/CharacterList']);
			}
    }

    incrementTab(tabName) {
				this.character[tabName] += 1;
				this.updateCharacter();
    }

    clearTab(tabName) {
				this.character[tabName] = 0;
				this.updateCharacter();
    }

		addSpell(e) {
				e.preventDefault();
				if (this.newSpellName && this.character.spells.indexOf(this.newSpellName) === -1) {
					if(this.newSpellLevel && this.newSpellDomain && this.newSpellDescription) {
						let spell = { name: this.newSpellName, level: this.newSpellLevel, domain: this.newSpellDomain, description: this.newSpellDescription, tab: 0 };
						this.character.spells.push(spell);
						this.newSpellName = '';
						this.newSpellLevel = 0;
						this.newSpellDomain = '';
						this.newSpellDescription = '';
						this.updateCharacter();
					}
				}
		}

		addSkill(e) {
				e.preventDefault();
				if (this.newSkillName && this.character.skills.indexOf(this.newSkillName) === -1) {
						if (this.newSkillLevel && this.newSkillStat) {
								let skill = {name: this.newSkillName, level: this.newSkillLevel, stat: this.newSkillStat};
								this.character.skills.push(skill);
								this.newSkillName = '';
								this.newSkillStat = '';
								this.newSkillLevel = 0;
								this.updateCharacter();
						}
				}
		}

		addFeat(e) {
				e.preventDefault();
				if (this.newFeatName && this.character.feats.indexOf(this.newFeatName) === -1) {
					if(this.newFeatDesc) {
						this.character.feats.push({name: this.newFeatName, description: this.newFeatDesc});
						this.newFeatName = '';
						this.newFeatDesc = '';
						this.updateCharacter();
					}
				}
		}

		updateCharacter() {
				Characters.update({ _id: this.character._id }, this.character);
		}
}