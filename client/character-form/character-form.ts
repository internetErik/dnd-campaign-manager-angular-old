/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';

import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';

// import {Characters} from 'collections/characters';

@Component({
	selector: 'character-form'
})
@View({
	templateUrl: 'client/character-form/character-form.html',
	directives: [FORM_DIRECTIVES, NgFor]
})
export class CharacterForm {
	characterForm: ControlGroup;

	newSkillName: string;
	newFeatName: string;
	skills: string[];
	feats: string[];

	constructor() {
			var fb = new FormBuilder();
			this.characterForm = fb.group({
					firstName: ['', Validators.required],
					middleName: [''],
					lastName: [''],
					title: [''],
					race: ['', Validators.required],
					gender: [''],
					heightM: ['', Validators.required],
					heightCm: ['', Validators.required],
					weight: ['', Validators.required],
					str: ['', Validators.required],
					int: ['', Validators.required],
					wis: ['', Validators.required],
					con: ['', Validators.required],
					dex: ['', Validators.required],
					cha: ['', Validators.required],
					backstory: ['']
			});

			this.newSkillName = '';
			this.newFeatName = '';

			this.skills = [];
			this.feats = [];
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

		if(this.characterForm.valid) {
				let skills = [], feats = [], c;

				//build skill data
				if (this.skills.length > 0) {
						skills = this.skills.map((skill) => {
								var ele: HTMLInputElement = 
									<HTMLInputElement>document.querySelector('#skill-' + skill);
								return { name: skill, level: ele.value };
						})
				}
				//build skill data
				if (this.feats.length > 0) {
						feats = this.feats.map((feat) => {
								var ele: HTMLInputElement = 
									<HTMLInputElement>document.querySelector('#feat-' + feat);
								return { name: feat, level: ele.value };
						});
				}

				c = {
						firstName: character.firstName,
						middleName: character.middleName,
						lastName: character.lastName,
						title: character.title,
						race: character.race,
						gender: character.gender,
						heightM: character.heightM,
						heightCm: character.heightCm,
						weight: character.weight,
						str: character.str,
						int: character.int,
						wis: character.wis,
						con: character.con,
						dex: character.dex,
						cha: character.cha,
						backstory: character.backstory,
						skills: skills,
						feats: feats
				};

				Meteor.call('insertCharacter', c);

				//reset form
				(<any>this.characterForm.controls['firstName']).updateValue('');
				(<any>this.characterForm.controls['middleName']).updateValue('');
				(<any>this.characterForm.controls['lastName']).updateValue('');
				(<any>this.characterForm.controls['title']).updateValue('');
				(<any>this.characterForm.controls['race']).updateValue('');
				(<any>this.characterForm.controls['gender']).updateValue('');
				(<any>this.characterForm.controls['heightM']).updateValue(0);
				(<any>this.characterForm.controls['heightCm']).updateValue(0);
				(<any>this.characterForm.controls['weight']).updateValue(0);
				(<any>this.characterForm.controls['str']).updateValue(0);
				(<any>this.characterForm.controls['int']).updateValue(0);
				(<any>this.characterForm.controls['wis']).updateValue(0);
				(<any>this.characterForm.controls['con']).updateValue(0);
				(<any>this.characterForm.controls['dex']).updateValue(0);
				(<any>this.characterForm.controls['cha']).updateValue(0);
				(<any>this.characterForm.controls['backstory']).updateValue('');
				this.skills = [];
				this.feats = [];
				this.newSkillName = '';
				this.newFeatName = '';
		}
	}
}