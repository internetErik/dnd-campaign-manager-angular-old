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
		if (battle.combatPhase === 0 && battle.combatants.every((c) => c.actionSubmitted || c.roundsOccupied > 0 )) {
			//see if we need to advance to 1
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