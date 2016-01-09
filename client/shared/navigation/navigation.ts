import {Component, NgZone} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';

import {AccountsModal} from 'client/shared/accounts-modal/accounts-modal';

import {InjectUser} from 'meteor-accounts';

import {MeteorComponent} from 'angular2-meteor';

@Component({
    selector: 'navigation',
	templateUrl: 'client/shared/navigation/navigation.html',
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
		this.router.navigate(['/CampaignList']);
		Session.set('character', null);
		Session.set('campaign', null);
	}

	unselectCharacter() {
		this.router.navigate(['/CharacterList', {campaignId: this.campaign._id}]);
		Session.set('character', null);
	}
}