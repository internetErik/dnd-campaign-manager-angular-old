import {Component, EventEmitter} from '@angular/core';
@Component({
  selector: 'spell-list',
  inputs: ['spells', 'spellsSelectable', 'spellsRemovable'],
  outputs: ['spellSelected', 'spellRemoved'],
	template: `
	<div 
		*ngFor="let spell of spells;let i = index" 
		[class.pt30]="i !== 0">
		<h5 class="ttc">{{ spell.name }}</h5>
		<label class="w125">Level:</label> {{spell.level}}<br>
		<label class="w125">School:</label> {{spell.school}}<br>
		<label class="w125">Range:</label> {{spell.range}}<br>
		<label class="w125">Duration:</label> {{spell.duration}}<br>
		<label class="w125">Components:</label> {{spell.components}}<br>
		<label class="w125">Casting Time:</label> {{spell.castingTime}}<br>
		<label class="w125">Description:</label><br>
		{{spell.description}}<br>
		<button 
			*ngIf="spellsRemovable" 
			(click)="removeSpell($event, spell)">-</button>
		<button 
			*ngIf="spellsSelectable" 
			(click)="selectSpell($event, spell)">select</button>
	</div>
	`
})
export class SpellList {
	spells: Mongo.Cursor<Object>;
	spellsSelectable: boolean;
	spellsRemoveable: boolean;

	spellSelected: EventEmitter<any> = new EventEmitter();
	spellRemoved: EventEmitter<any> = new EventEmitter();

	removeSpell(e: Event, spell) {
		e.preventDefault();
		this.spellRemoved.emit(spell);
	}

	selectSpell(e: Event, spell) {
		e.preventDefault();
		this.spellSelected.emit(spell);
	}
}