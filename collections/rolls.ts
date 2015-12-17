/// <reference path="../typings/angular2-meteor.d.ts" />

export var Rolls = new Mongo.Collection('rolls');

Meteor.methods({
	insertRoll: function(roll) {
		return Rolls.insert(roll);
	},
	clearRolls: function() {
		Rolls.remove({});
	}
});