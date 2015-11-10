import {loadCharacters} from 'server/loadCharacters';

import {Rolls} from 'collections/rolls';
import {Spells} from 'collections/spells';
import {Skills} from 'collections/skills';
import {Feats} from 'collections/feats';

Meteor.startup(function() { 
		//for some reason if we don't do something with the DBS on start, 
		//they won't show on the front end
		loadCharacters();
		Rolls.find().count();
		Spells.find().count();
		Skills.find().count();
		Feats.find().count(); 
});

Meteor.methods({
	'clearRolls': function(){
			Rolls.remove({});
	}
})