/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';

import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';

import {Characters} from 'collections/characters';

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
					'height-m': ['', Validators.required],
					'height-cm': ['', Validators.required],
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

	addSkill() {
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

	addFeat() {
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

	addCharacter(character) {
		if(this.characterForm.valid) {
				console.log(character);
		}
	}
}