import 'reflect-metadata';
import {Component, NgZone} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {Characters} from '../../../lib/collections/characters';
import {Spells} from '../../../lib/collections/spells';
import {Skills} from '../../../lib/collections/skills';
import {Feats} from '../../../lib/collections/feats';
import {RequireUser, InjectUser} from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
import {SpellList} from '../../components/spell-list/spell-list';
import {SpellFilter} from '../../components/spell-filter/spell-filter';
import {SkillList} from '../../components/skill-list/skill-list';
import {FeatList} from '../../components/feat-list/feat-list';
import {CharacterJumpMenu} from '../character-detail/character-jump-menu/character-jump-menu';
import {CommandPaletteService} from '../../services/command-palette-service';

@Component({
    selector: 'character-detail',
    templateUrl: 'client/pages/character-detail/character-detail.html',
    directives: [SpellList, SpellFilter, SkillList, FeatList, CharacterJumpMenu]
})
@RequireUser()
@InjectUser('currentUser')
export class CharacterDetail extends MeteorComponent {
  currentUser: any;
  router: Router;
  zone: NgZone;

  campaign: any;
  character: any;

	saveMessage: string = '';

	selectedSpell: string;

	spells: Mongo.Cursor<Object>;
	skills: Mongo.Cursor<Object>;
	feats: Mongo.Cursor<Object>;

	characterSpells: any[];

	learnedSortQuery: any = { name: 1 };

	filterQuery: any = {};
	sortQuery: any = {};

	showSpellModal: boolean = false;
	showSkillModal: boolean = false;
	showFeatModal: boolean = false;

	constructor(_router: Router, params: RouteParams, _zone: NgZone) {
    super(); 
    this.zone = _zone;
    this.router = _router;
    this.campaign = Session.get('campaign');
    if (this.campaign) {
      var characterId = params.get('characterId');

      this.subscribe('character', characterId, () => {
          this.character = Characters.findOne({ _id: characterId });
          this.characterSpells = this.character.spells;
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
    }
    else
      this.router.navigate(['/CampaignList']);

    CommandPaletteService.registerAction('save-character', () => {
      this.updateCharacter();
    });
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

	learnSpell(spell) {
		this.character.spells.push(spell);
		this.updateCharacter();
	}

	unlearnSpell(spell) {
		var i = this.character.spells.indexOf(spell);
		if (i > -1) {
			this.character.spells.splice(i, 1);
			this.updateCharacter();
		}
	}

	learnSkill(skill) {
		this.character.skills.push(skill);
		this.updateCharacter();
	}

	unlearnSkill(skill) {
		var i = this.character.skills.indexOf(skill);
		if (i > -1) {
			this.character.skills.splice(i, 1);
			this.updateCharacter();
		}
	}

	learnFeat(feat) {
		this.character.feats.push(feat);
		this.updateCharacter();
	}

	unlearnFeat(feat) {
		var i = this.character.feats.indexOf(feat);
		if (i > -1) {
			this.character.feats.splice(i, 1);
			this.updateCharacter();
		}
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
      	this.zone.run(() => setTimeout(() => this.saveMessage = '', 500));
		});
	}

	sortLearnedSpells(sortQuery) { 
		var field, direction;

		if(sortQuery)
			this.learnedSortQuery = sortQuery.sort;

		for(let x in this.learnedSortQuery) {
			field = x;
			direction = this.learnedSortQuery[x];
			break;
		}

		this.characterSpells = this.characterSpells.sort((a, b) => {
			if (a[field] > b[field])
				return direction;
			if (a[field] < b[field])
				return -1 * direction;
			return 0;
		});
	}
	
	filterLearnedSpells(filterQuery) { 
		var tmp = this.character.spells,
			field;

		for(field in filterQuery) {
			tmp = tmp.filter((spell) => {
				if (field === 'name')
					return filterQuery.name.test(spell.name);
				else
					return (spell[field] === filterQuery[field]) ? true : false;
			});
		}
		this.characterSpells = tmp;

		this.sortLearnedSpells(void(0));
	}

	sortAllSpells(sortQuery) {
		this.sortQuery = sortQuery;
		this.getAllSpells();
	}

	filterAllSpells(filterQuery) {
		this.filterQuery = filterQuery;
		this.getAllSpells();
	}

	getAllSpells() {
		this.subscribe('spells', () => {
			this.spells = Spells.find(this.filterQuery, this.sortQuery);
		}, true);
	}

  deleteCharacter(e) {
		e.preventDefault();
		if (confirm(`Are you sure you want to delete this character?`)) {
			this.call('removeCharacter', this.character._id);
			Session.set('character', null);
			this.router.parent.navigate(['/CharacterList']);
		}
  }
}