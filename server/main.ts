import {initSpells} from '../server/init/initSpells';
import {initSkills} from '../server/init/initSkills';
import {initFeats} from '../server/init/initFeats';

import './publish';

Meteor.startup(function() { 
	initSpells();
	initSkills();
	initFeats();
});