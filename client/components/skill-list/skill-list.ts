import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'skill-list',
  inputs: ['skills', 'skillsSelectable', 'skillsRemoveable'],
  outputs: ['skillSelected', 'skillRemoved'],
	template: `
	<ul class="pb20">
		<li 
			*ngFor="#skill of skills; #i = index" 
			[class.pt15]="i !== 0">
			{{ skill.name }} ({{skill.stat}})
			<span *ngIf="skillsRemoveable">
				<label for="">Level:</label>
				<input type="number" max="20" [(ngModel)]="skill.level" />
			</span>
			<button 
				*ngIf="skillsRemoveable"
				(click)="removeSkill($event, skill)">-</button>
			<button 
				*ngIf="skillsSelectable"
				(click)="selectSkill($event, skill)">select</button>
		</li>
	</ul>
	`
})
export class SkillList {
	skills: Mongo.Cursor<Object>;
	skillsSelectable: boolean;
	skillsRemoveable: boolean;

	skillSelected: EventEmitter<any> = new EventEmitter();
	skillRemoved: EventEmitter<any> = new EventEmitter();

	removeSkill(e: Event, skill) {
		e.preventDefault();
		this.skillRemoved.emit(skill);
	}

	selectSkill(e: Event, skill) {
		e.preventDefault();
		this.skillSelected.emit(skill);
	}
}