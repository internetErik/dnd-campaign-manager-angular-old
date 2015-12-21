/// <reference path="../../../typings/angular2-meteor.d.ts" />

import {Component, EventEmitter} from 'angular2/core';

@Component({
    selector: 'feat-list',
    inputs: ['feats', 'featsSelectable', 'featsRemovable'],
    outputs: ['featSelected', 'featRemoved'],
	templateUrl: 'client/components/feat-list/feat-list.html'
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