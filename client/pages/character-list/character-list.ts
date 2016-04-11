import 'reflect-metadata';
import {Component} from 'angular2/core';
import {Characters} from '../../../lib/collections/characters';
import {Router, RouterLink} from 'angular2/router';
import {RequireUser, InjectUser} from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';

@Component({
  selector: 'character-list',
  directives: [RouterLink],
  template: `
<div *ngIf="campaign">
	<h1>Character List</h1>
	<hr>
	<section class="p20-0 m20-0">
		<a [routerLink]="['/CharacterForm']">
			<button>Add Character</button>
		</a>
	</section>
	<section class="p20-0 m20-0">
		<h2>PCs</h2>
		<div *ngFor="#character of pcs" class="p10-0">
			<a [routerLink]="['/CharacterDetail', {characterId: character._id}]">
				{{character.firstName}} {{character.middleName}} {{character.lastName}}
			</a>
			<button *ngIf="currentUser._id === character.userId"
				(click)="selectCharacter(character)">Select</button>
		</div>
	</section>
	<div *ngIf="currentUser._id === campaign.creator">
		<hr>
		<section class="p20-0 m20-0">
			<h2>NPCs</h2>
			<div *ngFor="#character of npcs" class="p10-0">
				<a [routerLink]="['/CharacterDetail', {characterId: character._id}]">
					{{character.firstName}} {{character.middleName}} {{character.lastName}}
				</a>
			</div>
		</section>
	</div>
</div>
  `
})
@RequireUser()
@InjectUser('currentUser')
export class CharacterList extends MeteorComponent {
	currentUser: any;
	pcs: Mongo.Cursor<Object>;
	npcs: Mongo.Cursor<Object>;
	campaign: any;

	constructor(router: Router) {
		super();
    this.autorun(() => { 
			this.campaign = Session.get('campaign');
      if (!this.campaign)
        router.navigate(['/CampaignList']);
			this.subscribe('characters', () => {
				this.pcs = Characters
					.find({ campaignId: this.campaign._id, characterType: 'PC' });

				this.npcs = Characters
					.find({ campaignId: this.campaign._id, characterType: 'NPC' });
			}, true);
    }, true);
	}

	selectCharacter(character) {
		Session.set('character', character);
	}
}