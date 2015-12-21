/// <reference path="../../../typings/angular2-meteor.d.ts" />
/// <reference path="../../../typings/meteor-accounts.d.ts" />

import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {Characters} from 'lib/collections/characters';
import {Spells} from 'lib/collections/spells';
import {Skills} from 'lib/collections/skills';
import {Feats} from 'lib/collections/feats';

import {RequireUser, InjectUser} from 'meteor-accounts';

import {MeteorComponent} from 'angular2-meteor';

import {SpellList} from 'client/components/spell-list/spell-list';
import {SpellFilter} from 'client/components/spell-filter/spell-filter';

@Component({
    selector: 'character-detail',
    templateUrl: 'client/components/character-detail/character-detail.html',
    directives: [SpellList, SpellFilter]
})
@RequireUser()
@InjectUser('currentUser')
export class CharacterDetail extends MeteorComponent {
    currentUser: any;
    router: Router;

    character: any;

	newSpellName: string = '';
	newSpellLevel: number = 0;
	newSpellDomain: string = '';
	newSpellDescription: string = '';

	newSkillName: string = '';
	newSkillStat: string = '';
	newSkillLevel: number = 0;

	newFeatName: string = '';
	newFeatDesc: string = '';

	saveMessage: string = '';

	selectedSpell: string;

	spells: Mongo.Cursor<Object>;
	skills: Mongo.Cursor<Object>;
	feats: Mongo.Cursor<Object>;

	filterQuery: any = {};
	sortQuery: any = {};

	constructor(_router: Router, params: RouteParams) {
		super();

        var characterId = params.get('characterId');

        this.subscribe('character', characterId, () => {
			this.character = Characters.findOne();
        }, true);

        this.subscribe('spells', () => { 
			this.spells = Spells.find();
        }, true);

        this.subscribe('skills', () => { 
			this.skills = Skills.find();
        }, true);
        
        this.subscribe('feats', () => { 
			this.feats = Feats.find();
        }, true);

        this.router = _router;
    }

    deleteCharacter(e) {
		e.preventDefault();
		if(confirm(`Are you sure you want to delete this character?`)) {
			this.call('removeCharacter', this.character._id);
			Session.set('character', null);
			this.router.parent.navigate(['/CharacterList']);
		}
    }

    incrementTab(tabName) {
		this.character[tabName] += 1;
		this.updateCharacter();
    }

    clearTab(tabName) {
		this.character[tabName] = 0;
		this.updateCharacter();
    }

    getHitRoll() {
		var hr = this.character.hitRoll + this.character.hitRollBonus;
		var attacks = [];

		if (hr > 6) {
			let j = 0;
			for (let i = 0; hr > 0;) {
				for (j = 0; j < 6 && hr > 0; j++ , hr--)
					;
				attacks.push(j);
				if (attacks.length === 6 && attacks[5] === 6)
					break;
			}

			for (let i = 0; hr > 0; i++, hr--)
				attacks[i % 6]++;

			return `+${attacks.join(' / +')} (${attacks.length} attacks)`;
		}
		else
			return `+${hr}`;
    }

    getCasterLevel() {
		var spellLevel = 9;
		for (; spellLevel >= 0; spellLevel--)
			if (this.character['level' + spellLevel] > 0)
				break;
		return spellLevel + 1;
    }

	addSpell(e) {
		e.preventDefault();
		if (this.newSpellName && this.character.spells.indexOf(this.newSpellName) === -1) {
			if(this.newSpellLevel >= 0 && this.newSpellDomain && this.newSpellDescription) {
				let spell = { 
					name: this.newSpellName.toLowerCase(), 
					level: this.newSpellLevel, 
					domain: this.newSpellDomain, 
					description: this.newSpellDescription
				};
				this.character.spells.push(spell);
				this.newSpellName = '';
				this.newSpellLevel = 0;
				this.newSpellDomain = '';
				this.newSpellDescription = '';
				this.updateCharacter();
			}
		}
	}

	unlearnSpell(e, spell) {
		e.preventDefault();
		var i = this.character.spells.indexOf(spell);
		if (i > -1) {
			this.character.spells.splice(i, 1);
			this.updateCharacter();
		}
	}

	removeSkill(e, skill) {
		e.preventDefault()
		var i = this.character.skills.indexOf(skill);
		if (i > -1) {
			this.character.skills.splice(i, 1);
			this.updateCharacter();
		}
	}

	addFeat(e) {
		e.preventDefault();
		if (this.newFeatName && this.character.feats.indexOf(this.newFeatName) === -1) {
			if(this.newFeatDesc) {
				this.character.feats.push({
					name: this.newFeatName.toLowerCase(), 
					description: this.newFeatDesc
				});
				this.newFeatName = '';
				this.newFeatDesc = '';
				this.updateCharacter();
			}
		}
	}

	removeFeat(e, feat) {
		e.preventDefault();
		var i = this.character.feats.indexOf(feat);
		if (i > -1) {
			this.character.feats.splice(i, 1);
			this.updateCharacter();
		}
	}

	saveCharacter(e) {
		e.preventDefault();
		this.updateCharacter();
	}

	updateCharacter() {
		this.saveMessage = "saving . . .";
		this.call('updateCharacter', this.character._id, this.character, (e, r) => {
			this.saveMessage = 'saved successfully!';
			if (e) {
				this.saveMessage = 'Error saving character!';
				console.log("Error updating character:", e);
			}
			else
				setTimeout(() => { this.saveMessage = '' }, 500);
		});
	}



	sortSpells(sortQuery) {
		this.sortQuery = sortQuery;
		this.getSpells();
	}

	filterSpells(filterQuery) {
		this.filterQuery = filterQuery;
		this.getSpells();
	}

	getSpells() {
		this.subscribe('spells', () => {
			this.spells = Spells.find(this.filterQuery, this.sortQuery);
		}, true);
	}

	learnSpell(spell) {
		this.character.spells.push(spell);
		this.updateCharacter();
	}
}