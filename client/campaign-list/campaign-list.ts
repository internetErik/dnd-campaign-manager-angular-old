/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts.d.ts" />

import {Component, NgZone} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {Campaigns} from 'collections/campaigns';
import {RequireUser} from 'meteor-accounts';

@Component({
	selector: 'campaign-list',
	templateUrl: 'client/campaign-list/campaign-list.html',
	directives: [RouterLink]
})
@RequireUser()
export class CampaignList {
	campaigns: Mongo.Cursor<Object>;
	currentUser: any;

	constructor(zone: NgZone) {
		this.campaigns = Campaigns.find({});
		Tracker.autorun(() => zone.run(() => {
			this.currentUser = Meteor.user();
		}));
	}

	deleteCampaign(e, campaign) {
		e.preventDefault();
		if (confirm(`Are you sure you want to delete this campaign?`)) {
			Meteor.call('removeCampaign', campaign._id);
		}
	}

	selectCampaign(campaign) {
		Session.set('campaign', campaign);
	}
}