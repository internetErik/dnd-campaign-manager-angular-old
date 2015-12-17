/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts-ui.d.ts" />

import {Component, NgZone} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';

import {AccountsModal} from 'client/accounts-modal/accounts-modal';

@Component({
    selector: 'navigation',
	templateUrl: 'client/navigation/navigation.html',
	directives: [RouterLink, AccountsModal]
})
export class Navigation {
	currentUser: any;
	campaign: any;
	character: any;
	router: Router;

	constructor(_router: Router, zone: NgZone) {
		this.router = _router;
		Tracker.autorun(() => zone.run(() => {
			this.currentUser = Meteor.user();
			this.campaign = (this.currentUser) ? Session.get('campaign') : null;
			this.character = Session.get('character');
		}));
	}

	unselectCampaign() {
		Session.set('character', null);
		Session.set('campaign', null);
		this.router.navigate(['/CampaignList']);
	}

	unselectCharacter() {
		Session.set('character', null);
		this.router.navigate(['/CharacterList', {campaignId: this.campaign._id}]);
	}
}