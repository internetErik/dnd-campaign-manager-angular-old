/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';

import {Router} from 'angular2/router';

import {Characters} from 'collections/characters';

import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';

@Component({
	selector: 'character-form'
})
@View({
	templateUrl: 'client/character-form/character-form.html',
	directives: [FORM_DIRECTIVES, NgFor]
})
export class CharacterForm {
	characterForm: ControlGroup;
	router: Router;

	newSpellName: string;
	newSkillName: string;
	newFeatName: string;
	spells: string[];
	skills: string[];
	feats: string[];

	constructor(_router: Router) {
			var fb = new FormBuilder();
			this.characterForm = fb.group({
					firstName: ['', Validators.required],
					middleName: [''],
					lastName: [''],
					title: [''],
					race: ['', Validators.required],
					sex: [''],
					heightM: [1, Validators.required],
					heightCm: [50, Validators.required],
					weight: [80, Validators.required],
					birthday: [''],
					age: [18],
					description: [''],
					hp: [1, Validators.required],
					str: [10, Validators.required],
					int: [10, Validators.required],
					wis: [10, Validators.required],
					con: [10, Validators.required],
					dex: [10, Validators.required],
					cha: [10, Validators.required],
					hitRoll: [0],
					reflex: [0],
					fortitude: [0],
					will: [0],
					level0: [0],
					level1: [0],
					level2: [0],
					level3: [0],
					level4: [0],
					level5: [0],
					level6: [0],
					level7: [0],
					level8: [0],
					level9: [0],
					backstory: ['']
			});

			this.newSpellName = '';
			this.newSkillName = '';
			this.newFeatName = '';

			this.spells = [];
			this.skills = [];
			this.feats = [];

			this.router = _router;
	}

	addSpell(e) {
			e.preventDefault();
			if (this.newSpellName && this.spells.indexOf(this.newSpellName) === -1) {
					this.spells.push(this.newSpellName);
					this.newSpellName = '';
			}
	}

	removeSpell(spell) {
			var i = this.spells.indexOf(spell);
			if (i > -1)
					this.spells.splice(i, 1);
	}

	addSkill(e) {
			e.preventDefault();
			if(this.newSkillName && this.skills.indexOf(this.newSkillName) === -1) {
					this.skills.push(this.newSkillName);
					this.newSkillName = '';
			}
	}

	removeSkill(skill) {
			var i = this.skills.indexOf(skill);
			if (i > -1)
					this.skills.splice(i, 1);
	}

	addFeat(e) {
			e.preventDefault();
			if (this.newFeatName && this.feats.indexOf(this.newFeatName) === -1) {
					this.feats.push(this.newFeatName);
					this.newFeatName = '';
			}
	}

	removeFeat(feat) {
			var i = this.feats.indexOf(feat);
			if (i > -1)
					this.feats.splice(i, 1);
	}

	/**
	 * addCharacter
	 *
	 * validates form data, then finally adds the character to the characters 
	 * collection
	 * 
	 * @param {any} character The form data (wihout skills and feats)
	 */
	addCharacter(e, character: any) {
		e.preventDefault();

		if (this.characterForm.valid) {
				let spells = [],
						skills = [],
						feats = [],
						_id, //id returned from insert
						c; //the character we are inserting

				//build spell data
				if (this.spells.length > 0) {
						spells = this.spells.map((spell) => {
								let eLev: HTMLInputElement =
										<HTMLInputElement>document.querySelector('#spellLevel-' + spell);
								let eDesc: HTMLInputElement =
										<HTMLInputElement>document.querySelector('#spellDesc-' + spell);
								let eDomain: HTMLInputElement =
										<HTMLInputElement>document.querySelector('#spellDomain-' + spell);
								return { 
									name: spell.toLowerCase(), 
									level: eLev.value, 
									domain: eDomain.value, 
									description: eDesc.value 
								};
						})
				}

				//build skill data
				if (this.skills.length > 0) {
						skills = this.skills.map((skill) => {
								let eLev: HTMLInputElement =
										<HTMLInputElement>document.querySelector('#skillLevel-' + skill);
								let eStat: HTMLInputElement =
										<HTMLInputElement>document.querySelector('#skillStat-' + skill);
								return { 
									name: skill.toLowerCase(), 
									level: eLev.value, 
									stat: eStat.value, 
									tab: 0 
								};
						})
				}

				//build feat data
				if (this.feats.length > 0) {
						feats = this.feats.map((feat) => {
								let ele: HTMLInputElement =
										<HTMLInputElement>document.querySelector('#feat-' + feat);
								return { 
									name: feat.toLowerCase(), 
									description: ele.value 
								};
						});
				}

				c = {
						firstName: character.firstName,
						middleName: character.middleName,
						lastName: character.lastName,
						title: character.title,
						race: character.race,
						sex: character.sex,
						heightM: character.heightM,
						heightCm: character.heightCm,
						weight: character.weight,
						birthday: character.birthday,
						age: character.age,
						description: character.description,
						bronze: 0,
						silver: 0,
						gold: 0,
						inventory: '',
						diety: '',
						alignment: '',
						hp: character.hp,
						damage: 0,
						hpBonus: 0,
						str: character.str,
						int: character.int,
						wis: character.wis,
						con: character.con,
						dex: character.dex,
						cha: character.cha,
						strBonus: 0,
						intBonus: 0,
						wisBonus: 0,
						conBonus: 0,
						dexBonus: 0,
						chaBonus: 0,
						strTab: 0,
						intTab: 0,
						wisTab: 0,
						conTab: 0,
						dexTab: 0,
						chaTab: 0,
						movement: 2,
						movementBonus: 0,
						hitRoll: character.hitRoll,
						hitRollBonus: 0,
						hitRollTab: 0,
						ac: 0,
						acBonus: 0,
						evade: 0,
						block: 0,
						evadeBonus: 0,
						reflex: character.reflex,
						fortitude: character.fortitude,
						will: character.will,
						reflexBonus: 0,
						fortitudeBonus: 0,
						willBonus: 0,
						reflexTab: 0,
						fortitudeTab: 0,
						willTab: 0,
						level0: character.level0,
						level1: character.level1,
						level2: character.level2,
						level3: character.level3,
						level4: character.level4,
						level5: character.level5,
						level6: character.level6,
						level7: character.level7,
						level8: character.level8,
						level9: character.level9,
						level0Bonus: 0,
						level1Bonus: 0,
						level2Bonus: 0,
						level3Bonus: 0,
						level4Bonus: 0,
						level5Bonus: 0,
						level6Bonus: 0,
						level7Bonus: 0,
						level8Bonus: 0,
						level9Bonus: 0,
						level0Tab: 0,
						level1Tab: 0,
						level2Tab: 0,
						level3Tab: 0,
						level4Tab: 0,
						level5Tab: 0,
						level6Tab: 0,
						level7Tab: 0,
						level8Tab: 0,
						level9Tab: 0,
						backstory: character.backstory,
						spells: spells,
						skills: skills,
						feats: feats
				};

				_id = Characters.insert(c);

				this.router.parent.navigate(['/CharacterDetail', { characterId: _id }]);
		}
		else
				console.log("form not valid");
	}
}