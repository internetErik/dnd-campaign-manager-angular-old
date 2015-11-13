/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts-ui.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';
import {Campaigns} from 'collections/campaigns';
import {RequireUser} from 'meteor-accounts';

@Component({
	selector: 'campaign-list'
})
@View({
	templateUrl: 'client/campaign-list/campaign-list.html',
	directives: [NgFor, RouterLink]
})
@RequireUser()
export class CampaignList {
	campaigns: Mongo.Cursor<Object>;

	constructor() {
		this.campaigns = Campaigns.find({});
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