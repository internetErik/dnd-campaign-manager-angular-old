/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts.d.ts" />

import {Component, NgZone} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';

import {AccountsModal} from 'client/accounts-modal/accounts-modal';

import {InjectUser} from 'meteor-accounts';

import {MeteorComponent} from 'angular2-meteor';

@Component({
    selector: 'navigation',
	templateUrl: 'client/navigation/navigation.html',
	directives: [RouterLink, AccountsModal]
})
@InjectUser('currentUser')
export class Navigation extends MeteorComponent {
	currentUser: any;
	campaign: any;
	character: any;
	router: Router;

	constructor(_router: Router, zone: NgZone) {
		super();

		Tracker.autorun(() => zone.run(() => {
			this.campaign = (this.currentUser) ? Session.get('campaign') : null;
			this.character = Session.get('character');
		}));
		
		this.router = _router;
	}
 
	unselectCampaign() {
		Session.set('character', null);
		Session.set('campaign', null);
		this.router.navigate(['/CampaignList']);
	}

	unselectCharacter() {
		Session.set('character', null);
		this.router.navigate(['/CharacterList', { campaignId: this.campaign._id }]);
	}
}