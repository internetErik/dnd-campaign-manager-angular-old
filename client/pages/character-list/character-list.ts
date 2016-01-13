import {Component, NgZone} from 'angular2/core';

import {Characters} from 'lib/collections/characters';

import {RouterLink, RouteParams} from 'angular2/router';

import {RequireUser, InjectUser} from 'meteor-accounts';

import {MeteorComponent} from 'angular2-meteor';

@Component({
    selector: 'character-list',
    templateUrl: 'client/pages/character-list/character-list.html',
    directives: [RouterLink]
})
@RequireUser()
@InjectUser('currentUser')
export class CharacterList extends MeteorComponent {
	currentUser: any;
	pcs: Mongo.Cursor<Object>;
	npcs: Mongo.Cursor<Object>;
	campaignId: string;

	constructor(zone: NgZone, params: RouteParams) {
		super();

		this.campaignId = params.get('campaignId');
		this.subscribe('characters', () => {
			this.pcs = (this.campaignId) ?
				Characters.find({ campaignId: this.campaignId, characterType: 'PC' }) :
				Characters.find({ characterType: 'PC' });

			this.npcs = (this.campaignId) ?
				Characters.find({ campaignId: this.campaignId, characterType: 'NPC' }) :
				Characters.find({ characterType: 'NPC' });
		}, true);
	}

	selectCharacter(character) {
		Session.set('character', character);
	}
}