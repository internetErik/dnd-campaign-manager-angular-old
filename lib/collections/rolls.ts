export var Rolls = new Mongo.Collection('rolls');

Meteor.methods({
	insertRoll: function(roll) {
		roll.CreateDate = Date.now();
		return Rolls.insert(roll);
	},
	clearRolls: function() {
		Rolls.remove({});
	}
});