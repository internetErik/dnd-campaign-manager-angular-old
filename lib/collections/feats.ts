export var Feats = new Mongo.Collection('feats');

Meteor.methods({
	insertFeat: function(feat) {
		return Feats.insert(feat);
	},
	updateFeat: function(_id, feat) {
		return Feats.update({ _id: _id }, feat);
	},
	removeFeat: function(_id, feat) {
		Feats.remove({ _id: _id });
	}
});