/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts.d.ts" />

import {Component, View, NgFor, NgIf, NgZone} from 'angular2/angular2';

import {Characters} from 'collections/characters';

import {RouterLink, RouteParams} from 'angular2/router';

import {RequireUser} from 'meteor-accounts';

@Component({
    selector: 'character-list'
})
@View({
    templateUrl: 'client/character-list/character-list.html',
    directives: [NgFor, NgIf, RouterLink]
})
@RequireUser()
export class CharacterList {
	characters: Mongo.Cursor<Object>;
	campaignId: string;

	constructor(zone: NgZone, params: RouteParams) {
		this.campaignId = params.get('campaignId');
		this.characters = (this.campaignId) ?
			Characters.find({ campaignId: this.campaignId }) :
			Characters.find({});
	}
}