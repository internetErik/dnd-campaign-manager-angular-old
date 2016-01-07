export var Characters = new Mongo.Collection('characters');

Meteor.methods({
	insertCharacter: function(character) {
		return Characters.insert(character);
	},
	updateCharacter: function(_id, character) {
		return Characters.update({ _id: _id }, character);
	},
	removeCharacter: function(_id) {
		Characters.remove({ _id: _id });
	}
});