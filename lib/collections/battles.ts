import {simpleRoll} from '../dice';

export var Battles = new Mongo.Collection('battles');

Meteor.methods({
	insertBattle: function(battle) {
		if (battle) {
			battle.createDate = Date.now();
			battle.complete = false;
			battle.combatPhase = -1;
			return Battles.insert(battle);
		}
	},
	updateBattle: function(_id, battle) {
		//if everyone has submitted their action, we roll for their initiative
		if (battle.combatPhase === 0 && 
			battle.combatants.every((c) => c.actionSubmitted || c.roundsOccupied > 0 )) {
			//see if we need to advance to 1

			//the sorting is too much to do on the server. Should sort on the client
	    battle.combatants = battle.combatants
		    .map((c) => { 
		      c.initiative = (c.roundsOccupied > 0) ?
		        0 : simpleRoll(100) + (c.bonus || 0);
		      return c; 
		    })
		    .sort((a:any, b:any) => {
		      if (a.initiative > b.initiative)
		        return -1;
		      else if (a.initiative < b.initiative)
		        return 1;
		      else
		        return 0;
		    });

			battle.combatPhase = 1;
		}
		
		return Battles.update({ _id: _id }, battle);
	},
	finishBattle: function(_id) {
		Battles.update({ _id: _id }, { $set: { complete: true } });
	},
	removeBattle: function(_id) {
		Battles.remove({ _id: _id });
	}
});