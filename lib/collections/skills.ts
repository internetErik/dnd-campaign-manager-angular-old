/// <reference path="../../typings/angular2-meteor.d.ts" />

export var Skills = new Mongo.Collection('skills');

Meteor.methods({
	insertSkill: function(skill) {
		return Skills.insert(skill);
	},
	updateSkill: function(_id, skill) {
		return Skills.update({ _id: _id }, skill);
	},
	removeSkill: function(_id) {
		Skills.remove({ _id: _id });
	}
});