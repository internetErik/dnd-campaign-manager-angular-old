export var Rolls = new Mongo.Collection('rolls');

Meteor.methods({
	insertRoll: function(roll) {
		roll.createDate = Date.now();
		return Rolls.insert(roll);
	},
	clearRolls: function(campaignId) {
		Rolls.remove({campaignId: campaignId});
	}
});