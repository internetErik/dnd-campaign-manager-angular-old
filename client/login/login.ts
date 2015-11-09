/// <reference path="../../typings/angular2-meteor.d.ts" />
/// 
import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {Router} from 'angular2/router';

import {Users} from 'collections/users';

import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';


@Component({
    selector: 'login'
})
@View({
    templateUrl: 'client/login/login.html',
    directives: [FORM_DIRECTIVES, NgFor, NgIf]
})
export class Login {
		loginForm: ControlGroup;
		registerForm: ControlGroup;

		isLoggingIn: boolean;

    router: Router;

		constructor(_router: Router) {
				this.router = _router;
				this.isLoggingIn = true;
		}

		toggleForm(e) {
				e.preventDefault();
				this.isLoggingIn = !this.isLoggingIn;
		}
}