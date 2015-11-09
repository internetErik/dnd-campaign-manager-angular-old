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
		
		loggedIn: any;
		isLoggingIn: boolean;

    router: Router;

		constructor(_router: Router) {
				var lfb = new FormBuilder();
				var rfb = new FormBuilder();

				this.router = _router;
				this.isLoggingIn = true;
				this.loggedIn = Meteor.user();

				this.loginForm = lfb.group({
						email: ['', Validators.required],
						password: ['', Validators.required]
				});

				this.registerForm = rfb.group({
						email: ['', Validators.required],
						password: ['', Validators.required],
						repassword: ['', Validators.required]
				});
		}

		toggleForm(e) {
				e.preventDefault();
				this.isLoggingIn = !this.isLoggingIn;
		}

		login(e, form) {
				e.preventDefault();
		}

		register(e, form) {
				e.preventDefault();

		}
}