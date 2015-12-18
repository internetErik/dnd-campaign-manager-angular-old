import {initSpells} from 'server/init/initSpells';
import {initSkills} from 'server/init/initSkills';
import {initFeats} from 'server/init/initFeats';

import {Characters} from 'lib/collections/characters';
import {Campaigns} from 'lib/collections/campaigns';
import {Rolls} from 'lib/collections/rolls';
import {Spells} from 'lib/collections/spells';
import {Skills} from 'lib/collections/skills';
import {Feats} from 'lib/collections/feats';
import {Monsters} from 'lib/collections/monsters';
import {Battles} from 'lib/collections/battles';

Meteor.startup(function() { 
	//for some reason if we don't do something with the DBS on start, 
	//they won't show on the front end
	Campaigns.find().count();
	Characters.find().count();
	initSpells();
	initSkills();
	initFeats();
});

Meteor.publish('battles', function() {
	return Battles.find();
});

Meteor.publish('campaigns', function() {
	return Campaigns.find();
});

Meteor.publish('characters', function() {
	return Characters.find();
});

Meteor.publish('character', function(characterId) {
	return Characters.find({_id: characterId});
});

Meteor.publish('feats', function() {
	return Feats.find();
});

Meteor.publish('monsters', function() {
	return Monsters.find();
});

Meteor.publish('rolls', function() {
	return Rolls.find();
});

Meteor.publish('skills', function() {
	return Skills.find();
});

Meteor.publish('spells', function() {
	return Spells.find();
});
