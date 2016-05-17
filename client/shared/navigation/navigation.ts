import 'reflect-metadata';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RouterLink} from '@angular/router-deprecated';
import {AccountsModal} from './accounts-modal/accounts-modal';
import {InjectUser} from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
@Component({
  selector: 'navigation',
	directives: [RouterLink, AccountsModal],
	template: `
<nav class="bgc-white h70 posr p0-50 heading5">
	<div class="vertical-align" *ngIf="currentUser">
	</div>
</nav>
<accounts-modal class="posa r0 t0 w300 p30"></accounts-modal>
<div class="sub-menu bgc-black c-white posr p0-50 heading5 h50 add-bottom-shadow">
	<span *ngIf="currentUser && campaign" class="vertical-align dib">
		Playing: {{ campaign.name }}
		<button class="c-white bd1-s-white" 
			(click)="unselectCampaign()">&times;</button>
		<span *ngIf="character">
			as 
			<a class="tdn" 
				[routerLink]="['/CharacterDetail', {characterId: character._id}]">
					{{ character.firstName }}
			</a>
			<button class="c-white bd1-s-white" 
				(click)="unselectCharacter()">&times;</button>
		</span>
		&gt;
		<a class="tdn" 
			[routerLink]="['/CharacterList']">
				Characters
		</a> |
		<a class="tdn" 
			[routerLink]="['/BattleList']">
				Battle List
		</a>
	</span>
	<span *ngIf="!campaign" class="vertical-align dib">
		No Campaign Selected.
	</span>
</div>
`
// 	template: `
// <nav class="bgc-white h70 posr p0-50 heading5">
// 	<div class="vertical-align" *ngIf="currentUser">
// 		<a class="tdn" [routerLink]="['/HomePage']">Home</a> |
// 		<a class="tdn" [routerLink]="['/CampaignList']">Campaigns</a> |
// 		<a class="tdn" [routerLink]="['/ContentCreator']">Content Creator</a>
// 	</div>
// </nav>
// <accounts-modal class="posa r0 t0 w300 p30"></accounts-modal>
// <div class="sub-menu bgc-black c-white posr p0-50 heading5 h50 add-bottom-shadow">
// 	<span *ngIf="currentUser && campaign" class="vertical-align dib">
// 		Playing: {{ campaign.name }}
// 		<button class="c-white bd1-s-white" 
// 			(click)="unselectCampaign()">&times;</button>
// 		<span *ngIf="character">
// 			as 
// 			<a class="tdn" 
// 				[routerLink]="['/CharacterDetail', {characterId: character._id}]">
// 					{{ character.firstName }}
// 			</a>
// 			<button class="c-white bd1-s-white" 
// 				(click)="unselectCharacter()">&times;</button>
// 		</span>
// 		&gt;
// 		<a class="tdn" 
// 			[routerLink]="['/CharacterList']">
// 				Characters
// 		</a> |
// 		<a class="tdn" 
// 			[routerLink]="['/BattleList']">
// 				Battle List
// 		</a>
// 	</span>
// 	<span *ngIf="!campaign" class="vertical-align dib">
// 		No Campaign Selected.
// 	</span>
// </div>
// `
})
@InjectUser('currentUser')
export class Navigation extends MeteorComponent {
	currentUser: any;
	campaign: any;
	character: any;
	router: Router;

	constructor(_router: Router) {
		super();

		this.autorun(() => {
			this.campaign = Session.get('campaign');
			this.character = Session.get('character');
		}, true);
		
		this.router = _router;
	}

	unselectCampaign() {
		this.router.navigate(['/CampaignList']);
		Session.set('character', null);
		Session.set('campaign', null);
	}

	unselectCharacter() {
		this.router.navigate(['/CharacterList']);
		Session.set('character', null);
	}
}