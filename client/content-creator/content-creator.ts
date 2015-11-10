/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';

@Component({
    selector: 'content-creator'
})
@View({
		templateUrl: 'client/content-creator/content-creator.html',
		directives: [NgFor, NgIf]
})
export class ContentCreator {
		constructor() {
		}
}