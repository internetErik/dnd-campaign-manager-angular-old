/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts.d.ts" />

import {Component, NgZone} from 'angular2/core';

import {Characters} from 'collections/characters';

import {RouterLink, RouteParams} from 'angular2/router';

import {RequireUser} from 'meteor-accounts';

@Component({
    selector: 'character-list',
    templateUrl: 'client/character-list/character-list.html',
    directives: [RouterLink]
})
@RequireUser()
export class CharacterList {
	pcs: Mongo.Cursor<Object>;
	npcs: Mongo.Cursor<Object>;
	campaignId: string;
	currentUser: any;

	constructor(zone: NgZone, params: RouteParams) {
		this.currentUser = Meteor.user();
		this.campaignId = params.get('campaignId');
		this.pcs = (this.campaignId) ?
			Characters.find({ campaignId: this.campaignId, characterType: 'PC' }) :
			Characters.find({ characterType: 'PC' });

		this.npcs = (this.campaignId) ?
			Characters.find({ campaignId: this.campaignId, characterType: 'NPC' }) :
			Characters.find({ characterType: 'NPC' });
	}

	selectCharacter(character) {
		Session.set('character', character);
	}
}