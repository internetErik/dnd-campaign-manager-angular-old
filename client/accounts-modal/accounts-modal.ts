/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, NgZone} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';

@Component({
    selector: 'accounts-modal',
	templateUrl: 'client/accounts-modal/accounts-modal.html',
	directives: [RouterLink]
})
export class AccountsModal {
	currentUser: any;
	router: Router;

	constructor(_router: Router, zone: NgZone) {
		this.router = _router;
		Tracker.autorun(() => zone.run(() => {
			this.currentUser = Meteor.user();
		}));
	}
}