import {loadCharacters} from 'server/loadCharacters';

import {Rolls} from 'collections/rolls';

Meteor.startup(function() { 
		loadCharacters();
		Rolls.find().count(); 
});

Meteor.methods({
	'clearRolls': function(){
			Rolls.remove({});
	}
})