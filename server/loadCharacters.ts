import {Characters} from 'collections/characters';

export function loadCharacters() {
  if (Characters.find().count() === 0) {

    var characters = [
        {
				  "firstName": "Bill",
				  "middleName": "",
				  "lastName": "Murray",
				  "title": "King",
				  "race": "Human",
				  "gender": "Male",
				  "heightM": 1,
				  "heightCm": 93,
				  "weight": 91,
				  "str": 18,
				  "int": 18,
				  "wis": 18,
				  "con": 18,
				  "dex": 18,
				  "cha": 18,
				  "backstory": "A funny dude",
				  "skills": [
				    {
				      "name": "Hunt",
				      "level": "2"
				    }
				  ],
				  "feats": [
				    {
				      "name": "Rage",
				      "level": "Get really angry and yell a lot."
				    }
				  ]
				}
    ];

    for (var i = 0; i < characters.length; i++) {
        Characters.insert(characters[i]);
    }
  }
};