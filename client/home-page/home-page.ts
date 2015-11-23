/// <reference path="../../typings/angular2-meteor.d.ts" />
import {Component, View} from 'angular2/angular2';

import {RouterLink, Router} from 'angular2/router';

@Component({
	selector: 'home-page'
})
@View({
	templateUrl: '/client/home-page/home-page.html',
	directives: [RouterLink]
})
export class HomePage {
	router: Router;

	constructor(_router: Router) {
			this.router = _router;
	}
}