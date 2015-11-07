import {Characters} from 'collections/characters';

export function loadCharacters() {
    if (Characters.find().count() === 0) {

                var characters = [
                        {
                            'name': 'Erik Christianson'
                        },
                        {
                            'name': 'Fred Flinstone'
                        },
                        {
                            'name': 'Savage Lounging'
                        }
                ];

                for (var i = 0; i < characters.length; i++) {
                        Characters.insert(characters[i]);
                }
        }
};