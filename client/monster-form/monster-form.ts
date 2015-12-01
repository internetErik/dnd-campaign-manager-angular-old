/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View} from 'angular2/angular2';

import {Monsters} from 'collections/monsters';


import {RequireUser} from 'meteor-accounts';

@Component({
    selector: 'monster-form'
})
@View({
	templateUrl: 'client/monster-form/monster-form.html'
})
@RequireUser()
export class MonsterForm {
}