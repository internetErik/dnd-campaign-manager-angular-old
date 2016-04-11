import 'reflect-metadata';
import {Component, EventEmitter} from 'angular2/core';

@Component({
	selector: 'combat-action-input',
	inputs: ['submitted'],
	outputs: ['actionSubmitted','actionUnsubmitted'],
	template: `
	<form class="pb20" (submit)="emitEvent($event, action)">
		<label>Action: </label>
		<br>
		<textarea cols="45" rows="3"
			#action
			[disabled]="submitted"></textarea>
		<br>
		<button [disabled]="submitted">Submit Action</button>
		<button [disabled]="!submitted">Cancel Action</button>
	</form>
	`
})
export class CombatActionInput {
	submitted: boolean;
	actionSubmitted: EventEmitter<any> = new EventEmitter();
	actionUnsubmitted: EventEmitter<any> = new EventEmitter();

	emitEvent(e, action) {
		e.preventDefault();
		if (this.submitted) {
			this.actionUnsubmitted.emit(void(0));
			this.submitted = false;
		}
		else if(action.value !== '') {
			this.actionSubmitted.emit(action.value);
			this.submitted = true;
		}
	}
}