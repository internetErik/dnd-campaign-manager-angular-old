/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts-ui.d.ts" />

import {Component, View, NgFor, NgIf, NgZone} from 'angular2/angular2';

import {RouterLink, Router} from 'angular2/router';

import {Campaigns} from 'collections/campaigns';

@Component({
		selector: 'campaign-list'
})
@View({
		templateUrl: 'client/campaign-list/campaign-list.html',
		directives: [NgFor, NgIf, RouterLink]
})
export class CampaignList {
		campaigns: Mongo.Cursor<Object>;
		ccampaign: any; //current campaign
		router: Router;

		constructor(zone: NgZone, _router: Router) {
			Tracker.autorun(() => zone.run(() => {
					this.ccampaign = Session.get('campaign');
			}));

			this.router = _router;

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