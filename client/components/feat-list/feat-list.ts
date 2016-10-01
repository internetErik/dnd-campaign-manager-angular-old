import {Component, EventEmitter} from '@angular/core';
@Component({
  selector: 'feat-list',
  inputs: ['feats', 'featsSelectable', 'featsRemovable'],
  outputs: ['featSelected', 'featRemoved'],
	template: `
	<ul class="pb20">
		<li 
			*ngFor="let feat of feats;let i = index" 
			[class.pt30]="i !== 0">
			<h5>{{ feat.name }}</h5>
			<div 
				*ngIf="feat.prerequisite"
				class="p10-0">
				<label>Prerequisites:</label>
				{{feat.prerequisite}}
			</div>
			<div class="p10-0">
				<label>Benefit:</label>
				<br>
				{{feat.benefit}}
			</div>
			<div 
				*ngIf="feat.normal"
				class="p10-0">
				<label>Normal: </label>
				{{feat.normal}}</div>
			<div 
				*ngIf="feat.special"
				class="p10-0">
				<label>Special: </label>
				{{feat.special}}
			</div>
			<button 
				*ngIf="featsRemovable"
				(click)="removeFeat($event, feat)">-</button>
			<button 
				*ngIf="featsSelectable"
				(click)="selectFeat($event, feat)">select</button>
		</li>
	</ul>
	`
})
export class FeatList {
	feats: Mongo.Cursor<Object>;
	featsSelectable: boolean;
	featsRemoveable: boolean;

	featSelected: EventEmitter<any> = new EventEmitter();
	featRemoved: EventEmitter<any> = new EventEmitter();

	removeFeat(e: Event, feat) {
		e.preventDefault();
		this.featRemoved.emit(feat);
	}

	selectFeat(e: Event, feat) {
		e.preventDefault();
		this.featSelected.emit(feat);
	}
}