/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';

import {RouteParams, Router} from 'angular2/router';

import {Characters} from 'collections/characters';

@Component({
    selector: 'character-detail'
})
@View({
    templateUrl: 'client/character-detail/character-detail.html',
    directives: [NgFor]
})
export class CharacterDetail {
    character: Object;
    router: Router;

    constructor(_router: Router, params: RouteParams) {
        var characterId = params.get('characterId');
        this.character = Characters.findOne({ _id: characterId });
        this.router = _router;
    }

    deleteCharacter() {
			if(confirm(`Are you sure you want to delete ${this.character.firstName} ${this.character.lastName}?`)) {
				Characters.remove({ _id: this.character._id });
				this.router.parent.navigate(['/CharacterList']);
			}
    }
}