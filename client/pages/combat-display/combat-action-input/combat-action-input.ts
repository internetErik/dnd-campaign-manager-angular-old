import {Component, EventEmitter} from 'angular2/core';

@Component({
	selector: 'combat-action-input',
	inputs: ['submitted'],
	outputs: ['actionSubmitted','actionUnsubmitted'],
	template: `
	<form class="pb20" (submit)="emitEvent($event)">
		<label>Action: </label>
		<br>
		<textarea cols="45" rows="3" 
			[(ngModel)]="action" 
			[disabled]="submitted"></textarea>
		<br>
		<button [disabled]="submitted">Submit Action</button>
		<button [disabled]="!submitted">Cancel Action</button>
	</form>
	`
})
export class CombatActionInput {
	action: string;

	submitted: boolean;
	actionSubmitted: EventEmitter<any> = new EventEmitter();
	actionUnsubmitted: EventEmitter<any> = new EventEmitter();

	emitEvent(e) {
		e.preventDefault();
		if (this.submitted) {
			this.actionUnsubmitted.emit(void(0));
			this.submitted = false;
		}
		else if(this.action !== '') {
			this.actionSubmitted.emit(this.action);
			this.action = '';
			this.submitted = true;
		}
	}
}