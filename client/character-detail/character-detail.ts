/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';

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

		saveMessage: string;

		constructor(_router: Router, params: RouteParams) {
        var characterId = params.get('characterId');
        this.router = _router;
				this.character = Characters.findOne({ _id: characterId });

				this.newSpellName = '';
				this.newSpellLevel = 0;
				this.newSpellDomain = '';
				this.newSpellDescription = '';
				
				this.newSkillName = '';
				this.newSkillStat = '';
				this.newSkillLevel = 0;

				this.newFeatName = '';

				this.saveMessage = '';
    }

    deleteCharacter(e) {
			e.preventDefault();
			if(confirm(`Are you sure you want to delete this character?`)) {
				Meteor.call('removeCharacter', this.character._id);
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
						let spell = { 
							name: this.newSpellName.toLowerCase(), 
							level: this.newSpellLevel, 
							domain: this.newSpellDomain, 
							description: this.newSpellDescription
						};
						this.character.spells.push(spell);
						this.newSpellName = '';
						this.newSpellLevel = 0;
						this.newSpellDomain = '';
						this.newSpellDescription = '';
						this.updateCharacter();
					}
				}
		}

		removeSpell(e, spell) {
			e.preventDefault();
			var i = this.character.spells.indexOf(spell);
			if (i > -1) {
					this.character.spells.splice(i, 1);
					this.updateCharacter();
			}
		}

		addSkill(e) {
				e.preventDefault();
				if (this.newSkillName && this.character.skills.indexOf(this.newSkillName) === -1) {
						if (this.newSkillLevel && this.newSkillStat) {
								let skill = {
									name: this.newSkillName.toLowerCase(), 
									level: this.newSkillLevel, 
									stat: this.newSkillStat
								};
								this.character.skills.push(skill);
								this.newSkillName = '';
								this.newSkillStat = '';
								this.newSkillLevel = 0;
								this.updateCharacter();
						}
				}
		}

		removeSkill(e, skill) {
				e.preventDefault()
				var i = this.character.skills.indexOf(skill);
				if (i > -1) {
					this.character.skills.splice(i, 1);
					this.updateCharacter();
				}
		}

		addFeat(e) {
				e.preventDefault();
				if (this.newFeatName && this.character.feats.indexOf(this.newFeatName) === -1) {
					if(this.newFeatDesc) {
						this.character.feats.push({
							name: this.newFeatName.toLowerCase(), 
							description: this.newFeatDesc
						});
						this.newFeatName = '';
						this.newFeatDesc = '';
						this.updateCharacter();
					}
				}
		}

		removeFeat(e, feat) {
			e.preventDefault();
			var i = this.character.feats.indexOf(feat);
			if (i > -1) {
				this.character.feats.splice(i, 1);
				this.updateCharacter();
			}
		}

		saveCharacter(e) {
				e.preventDefault();
				this.updateCharacter();
		}

		updateCharacter() {
				Meteor.call('updateCharacter', this.character._id, this.character, (e,r) => {
						if (e)
								console.log("Error updating character:", e);
						else {
								this.saveMessage = 'saved successfully . . .';
								setTimeout(() => { this.saveMessage = '' }, 500);
						}
				})

		}
}