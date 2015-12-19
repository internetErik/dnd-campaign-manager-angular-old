/// <reference path="../../../typings/angular2-meteor.d.ts" />
/// <reference path="../../../typings/meteor-accounts.d.ts" />

import {Component, NgZone} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {Campaigns} from 'lib/collections/campaigns';

import {RequireUser, InjectUser} from 'meteor-accounts';

import {MeteorComponent} from 'angular2-meteor';

@Component({
	selector: 'campaign-list',
	templateUrl: 'client/components/campaign-list/campaign-list.html',
	directives: [RouterLink]
})
@RequireUser()
@InjectUser('currentUser')
export class CampaignList extends MeteorComponent {
	campaigns: Mongo.Cursor<any>;
	currentUser: any;

	constructor(zone: NgZone) {
		super();
		this.subscribe('campaigns', () => {
			this.campaigns = Campaigns.find();
		}, true);
	}

	deleteCampaign(e, campaign) {
		e.preventDefault();
		if (confirm(`Are you sure you want to delete this campaign?`)) {
			this.call('removeCampaign', campaign._id);
		}
	}

	selectCampaign(campaign) {
		Session.set('campaign', campaign);
	}
}