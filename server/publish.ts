import {Characters} from 'lib/collections/characters';
import {Campaigns} from 'lib/collections/campaigns';
import {Rolls} from 'lib/collections/rolls';
import {Spells} from 'lib/collections/spells';
import {Skills} from 'lib/collections/skills';
import {Feats} from 'lib/collections/feats';
import {Monsters} from 'lib/collections/monsters';
import {Battles} from 'lib/collections/battles';

Meteor.publish('battles', function(campaignId: string) {
  return Battles.find({campaignId: campaignId});
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

Meteor.publish('rolls', function(campaignId: string) {
  return Rolls.find({
      campaignId: campaignId
    }, {
      sort: {createDate: -1}, 
      limit: 5
    });
});

Meteor.publish('skills', function() {
  return Skills.find();
});

Meteor.publish('spells', function() {
  return Spells.find();
});