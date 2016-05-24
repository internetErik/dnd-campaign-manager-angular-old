import 'reflect-metadata';
import {Component} from '@angular/core';
import {FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
import {Monsters} from '../../../lib/collections/monsters';
import {RequireUser} from 'angular2-meteor-accounts-ui';
@Component({
    selector: 'monster-form',
	templateUrl: 'client/components/monster-form/monster-form.html'
})
@RequireUser()
export class MonsterForm {
	monsterForm: ControlGroup;

	constructor() {
		var fb = new FormBuilder();
		this.monsterForm = fb.group({
			name: ['', Validators.required],
			description: [''],
			type: [''],
			subtype: [''],
			minHeightM: [1, Validators.required],
			maxHeightM: [1, Validators.required],
			minHeightCm: [50, Validators.required],
			maxHeightCm: [50, Validators.required],
			minWeight: [80, Validators.required],
			maxWeight: [80, Validators.required],
			minAge: [0],
			maxAge: [-1],
			minHp: [1, Validators.required],
			maxHp: [1, Validators.required],
			minStr: [10, Validators.required],
			maxStr: [10, Validators.required],
			minInt: [10, Validators.required],
			maxInt: [10, Validators.required],
			minWis: [10, Validators.required],
			maxWis: [10, Validators.required],
			minCon: [10, Validators.required],
			maxCon: [10, Validators.required],
			minDex: [10, Validators.required],
			maxDex: [10, Validators.required],
			minCha: [10, Validators.required],
			maxCha: [10, Validators.required],
			minHitRoll: [0],
			maxHitRoll: [0],
			minReflex: [0],
			maxReflex: [0],
			minFortitude: [0],
			maxFortitude: [0],
			minWill: [0],
			maxWill: [0],
			minLevel0: [0],
			maxLevel0: [0],
			minLevel1: [0],
			maxLevel1: [0],
			minLevel2: [0],
			maxLevel2: [0],
			minLevel3: [0],
			maxLevel3: [0],
			minLevel4: [0],
			maxLevel4: [0],
			minLevel5: [0],
			maxLevel5: [0],
			minLevel6: [0],
			maxLevel6: [0],
			minLevel7: [0],
			maxLevel7: [0],
			minLevel8: [0],
			maxLevel8: [0],
			minLevel9: [0],
			maxLevel9: [0]
		});
	}
}