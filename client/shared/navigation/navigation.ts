import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';

@Component({
  selector: 'navigation',
	template: `
<nav class="bgc-white h70 posr p0-50 heading5">
	<div class="vertical-align" *ngIf="currentUser">
		<a class="tdn" routerLink="/home">Home</a> |
		<a class="tdn" routerLink="/campaign">Campaigns</a> |
		<a class="tdn" routerLink="/content-creator">Content Creator</a>
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
				[routerLink]="['/character', character._id]">
					{{ character.firstName }}
			</a>
			<button class="c-white bd1-s-white" 
				(click)="unselectCharacter()">&times;</button>
		</span>
		&gt;
		<a class="tdn" 
			routerLink="/character">
				Characters
		</a> |
		<a class="tdn" 
			routerLink="/battle">
				Battle List
		</a>
	</span>
	<span *ngIf="!campaign" class="vertical-align dib">
		No Campaign Selected.
	</span>
</div>
`
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
		this.router.navigateByUrl('/campaign');
		Session.set('character', null);
		Session.set('campaign', null);
	}

	unselectCharacter() {
		this.router.navigateByUrl('/character');
		Session.set('character', null);
	}
}