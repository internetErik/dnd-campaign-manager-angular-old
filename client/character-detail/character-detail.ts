/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {RouteParams, Router} from 'angular2/router';

import {Characters} from 'collections/characters';

@Component({
    selector: 'character-detail'
})
@View({
    templateUrl: 'client/character-detail/character-detail.html',
    directives: [NgFor, NgIf]
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
			if(confirm(`Are you sure you want to delete this character?`)) {
				Characters.remove({ _id: this.character._id });
				this.router.parent.navigate(['/CharacterList']);
			}
    }

    incrementTab(tabName) {
				this.character[tabName] += 1;
				Characters.update({ _id: this.character._id }, this.character);
    }

    clearTab(tabName) {
				this.character[tabName] = 0;
				Characters.update({ _id: this.character._id }, this.character);
    }
}