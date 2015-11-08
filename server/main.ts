import {loadCharacters} from 'server/loadCharacters';

Meteor.startup(loadCharacters);