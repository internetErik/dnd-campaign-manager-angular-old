import {loadCharacters} from 'server/loadCharacters';

import {Characters} from 'collections/characters';
import {Campaigns} from 'collections/campaigns';
import {Rolls} from 'collections/rolls';
import {Spells} from 'collections/spells';
import {Skills} from 'collections/skills';
import {Feats} from 'collections/feats';
import {Monsters} from 'collections/monsters';
import {Battles} from 'collections/battles';

Meteor.startup(function() { 
	//for some reason if we don't do something with the DBS on start, 
	//they won't show on the front end
	loadCharacters();
	Campaigns.find().count();
	Rolls.find().count();
	Spells.find().count();
	Skills.find().count();
	Feats.find().count();
	Monsters.find().count();
	Battles.find().count();
});

Meteor.publish('campaigns', function() {
	return Campaigns.find({});
});

Meteor.publish('characters', function() {
	return Characters.find({});
});

Meteor.publish('spells', function() {
	return Spells.find({});
});

Meteor.publish('skills', function() {
	return Skills.find({});
});

Meteor.publish('feats', function() {
	return Feats.find({});
});

Meteor.publish('monsters', function() {
	return Monsters.find({});
});

Meteor.publish('rolls', function() {
	return Rolls.find({});
});

Meteor.publish('battles', function() {
	return Battles.find();
});

Meteor.methods({
	insertCampaign: function(campaign) {
		return Campaigns.insert(campaign);
	},
	updateCampaign: function(_id, campaign) {
		return Campaigns.update({ _id: _id }, campaign);
	},
	removeCampaign: function(_id) {
		Campaigns.remove({ _id: _id });
	},
	insertCharacter: function(character) {
		return Characters.insert(character);
	},
	updateCharacter: function(_id, character) {
		return Characters.update({ _id: _id }, character);
	},
	removeCharacter: function(_id) {
		Characters.remove({ _id: _id });
	},
	insertSpell: function(spell) { 
		return Spells.insert(spell);
	},
	updateSpell: function(_id, spell) { 
		return Spells.update({ _id: _id }, spell);
	},
	removeSpell: function(_id) {
		Spells.remove({ _id: _id });
	},
	insertSkill: function(skill) { 
		return Skills.insert(skill);
	},
	updateSkill: function(_id, skill) { 
		return Skills.update({ _id: _id }, skill);
	},
	removeSkill: function(_id) {
		Skills.remove({ _id: _id });
	},
	insertFeat: function(feat) { 
		return Feats.insert(feat);
	},
	updateFeat: function(_id, feat) {
		return Feats.update({ _id: _id }, feat);
	},
	removeFeat: function(_id, feat) {
		Feats.remove({ _id: _id });
	},
	insertRoll : function(roll){
		return Rolls.insert(roll);
	},
	clearRolls : function(){
		Rolls.remove({});
	}
})