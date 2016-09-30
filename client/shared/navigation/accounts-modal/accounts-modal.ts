import {Component, NgZone} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InjectUser} from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
@Component({
	selector: 'accounts-modal',
	templateUrl: 'client/shared/navigation/accounts-modal/accounts-modal.html'
})
@InjectUser('currentUser')
export class AccountsModal extends MeteorComponent {
	currentUser: any;
	loginForm: FormGroup;
	registerForm: FormGroup;
	
	//state
	modalOpen: boolean = false;
	modalState: string = 'login'; //login, register

	constructor(fb: FormBuilder, zone: NgZone) {
		super();
		this.loginForm = fb.group({
			email: ["", this.validEmail],
			password: ["", Validators.required]
		});

		this.registerForm = fb.group({
			email: ["", this.validEmail],
			matchingPasswords: fb.group({
				password: ["", Validators.required],
				rePassword: ["", Validators.required]
			}, { validator: this.matchingPasswords })
		});
	}

	toggleModal() {
		this.modalOpen = !this.modalOpen;
		console.log("toggling modal ", this.modalOpen);
	}

	logout() {
		Meteor.logout(); 
		this.modalOpen = false;
		this.modalState = 'login';
	}

	validEmail(emailControl: FormControl) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return (re.test(emailControl.value)) ?
			null : { invalidEmail: true };
	}

	matchingPasswords(group: any) {
		var pw1 = group.controls.password.value;
		var pw2 = group.controls.rePassword.value;
		return (pw1 === pw2) ? null : { passwordMismatch: true };
	}

	login(event) {
		event.preventDefault();

		if (this.loginForm.valid) {
			Meteor.loginWithPassword(
				this.loginForm.value.email, 
				this.loginForm.value.password, 
				(err) => { if (err) alert(err); } );
		}
	}

	register(event) {
		event.preventDefault();

		if (this.registerForm.valid) {
			let c: any = this.registerForm.controls
			Accounts.createUser({
					email: c.email.value,
					password: c.matchingPasswords.controls.password.value
				}, 
				(err) => { if (err) alert(err); });
		}
	}
}