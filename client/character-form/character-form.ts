/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';

import {Characters} from 'collections/characters';

import {RequireUser} from 'meteor-accounts';

@Component({
	selector: 'character-form'
})
@View({
	templateUrl: 'client/character-form/character-form.html',
	directives: [FORM_DIRECTIVES, NgFor]
})
@RequireUser()
export class CharacterForm {
	characterForm: ControlGroup;
	router: Router;
	campaignId: string;

	newSpellName: string;
	newSkillName: string;
	newFeatName: string;
	spells: string[];
	skills: string[];
	feats: string[];

	constructor(_router: Router, params: RouteParams) {
		var fb = new FormBuilder();

		this.campaignId = params.get('campaignId');

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
			let _id, //id returned from insert
				c; //the character we are inserting

			c = {
				campaignId: this.campaignId,
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
				level0: 0,
				level1: 0,
				level2: 0,
				level3: 0,
				level4: 0,
				level5: 0,
				level6: 0,
				level7: 0,
				level8: 0,
				level9: 0,
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
				level0Fail: 99,
				level1Fail: 99,
				level2Fail: 99,
				level3Fail: 99,
				level4Fail: 99,
				level5Fail: 99,
				level6Fail: 99,
				level7Fail: 99,
				level8Fail: 99,
				level9Fail: 99,
				level0FailBonus: 0,
				level1FailBonus: 0,
				level2FailBonus: 0,
				level3FailBonus: 0,
				level4FailBonus: 0,
				level5FailBonus: 0,
				level6FailBonus: 0,
				level7FailBonus: 0,
				level8FailBonus: 0,
				level9FailBonus: 0,
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
				notes: '',
				backstory: character.backstory,
				spells: [],
				skills: [],
				feats: []
			};

			Meteor.call('insertCharacter', c, (e, r) => {
				if (e)
					console.log("error inserting?", e);
				else
					this.router.parent.navigate(['/CharacterDetail', { characterId: r }]);
			});

		}
		else
			console.log("form not valid");
	}
}