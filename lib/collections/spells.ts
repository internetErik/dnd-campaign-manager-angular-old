export var Spells = new Mongo.Collection('spells');

Meteor.methods({
	insertSpell: function(spell) {
		return Spells.insert(spell);
	},
	updateSpell: function(_id, spell) {
		return Spells.update({ _id: _id }, spell);
	},
	removeSpell: function(_id) {
		Spells.remove({ _id: _id });
	}
});