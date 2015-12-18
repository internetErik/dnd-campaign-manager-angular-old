import {Skills} from 'lib/collections/skills';

export function initSkills() {
	if(Skills.find().count() === 0) {
		let skills = [
			{ name: 'appraise', stat: 'int' },
			{ name: 'balance', stat: 'dex' },
			{ name: 'bluff', stat: 'cha' },
			{ name: 'climb', stat: 'str' },
			{ name: 'concentration', stat: 'con' },
			{ name: 'decypher Script', stat: 'int' },
			{ name: 'diplomacy', stat: 'cha' },
			{ name: 'disable device', stat: 'int' },
			{ name: 'disguise', stat: 'cha' },
			{ name: 'escape artist', stat: 'dex' },
			{ name: 'forgery', stat: 'int' },
			{ name: 'gather information', stat: 'cha' },
			{ name: 'handle animal', stat: 'cha' },
			{ name: 'appraise', stat: 'int' },
			{ name: 'heal', stat: 'wis' },
			{ name: 'hide', stat: 'dex' },
			{ name: 'intimidate', stat: 'cha' },
			{ name: 'jump', stat: 'str' },
			{ name: 'appraise', stat: 'int' },
			{ name: 'listen', stat: 'wis' },
			{ name: 'move silently', stat: 'dex' },
			{ name: 'open lock', stat: 'dex' },
			{ name: 'perform', stat: 'cha' },
			{ name: 'appraise', stat: 'int' },
			{ name: 'ride', stat: 'dex' },
			{ name: 'search', stat: 'int' },
			{ name: 'sense motive', stat: 'wis' },
			{ name: 'slight of hand', stat: 'dex' },
			{ name: 'spellcraft', stat: 'int' },
			{ name: 'spot', stat: 'wis' },
			{ name: 'survival', stat: 'wis' },
			{ name: 'swim', stat: 'str' },
			{ name: 'tumble', stat: 'dex' },
			{ name: 'use magic device', stat: 'cha' },
			{ name: 'use rope', stat: 'dex' }
		];

		for (let i = 0; i < skills.length; i++)
			Skills.insert(skills[i]);
	}
}