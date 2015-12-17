/// <reference path="../typings/angular2-meteor.d.ts" />

export var Campaigns = new Mongo.Collection('campaigns');


Meteor.methods({
	insertCampaign: function(campaign) {
		return Campaigns.insert(campaign);
	},
	updateCampaign: function(_id, campaign) {
		return Campaigns.update({ _id: _id }, campaign);
	},
	removeCampaign: function(_id) {
		Campaigns.remove({ _id: _id });
	}
});