export var Campaigns = new Mongo.Collection('campaigns');

Meteor.methods({
	insertCampaign: function(campaign) {
		if (Meteor.user()) {
			campaign.creator = Meteor.user()._id;
			campaign.createDate = Date.now();
			return Campaigns.insert(campaign);
		}
	},
	updateCampaign: function(_id, campaign) {
		return Campaigns.update({ _id: _id }, campaign);
	},
	removeCampaign: function(_id) {
		return Campaigns.remove({ _id: _id });
	}
});