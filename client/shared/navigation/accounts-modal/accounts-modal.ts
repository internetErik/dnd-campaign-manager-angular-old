import {Component, NgZone} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InjectUser} from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
@Component({
	selector: 'accounts-modal',
	template: `
<div class="dib posr">
	<span *ngIf="currentUser">
		{{currentUser.emails[0].address}}
		<button (click)="logout()">&times;</button>
	</span>
	<span *ngIf="!currentUser">
		<span class="curp" (click)="toggleModal()">
			Sign In
			<i *ngIf="!modalOpen" class="fa fa-angle-down"></i>
			<i *ngIf="modalOpen" class="fa fa-angle-up"></i>
		</span>

		<div class="posa z1 bgc-white p20 add-shadow"
			[class.dn]="!modalOpen">
			<button class="posa t5 r5 border-circle" 
				(click)="modalOpen = false">&times;</button>
			
			<form (submit)="login($event)" 
				*ngIf="modalState === 'login'">
				<div class="p10">
					<label for="email">E-Mail:</label>
					<input class="w200" id="email" type="text"
						placeholder="email@example.com"
						ngControl="email">
				</div>
				<div class="p10">
					<label for="password">Password:</label>
					<input class="w200" id="password" type="password" 
						ngControl="password">
				</div>
				<div *ngIf="loginForm.dirty">
					<div class="fz12 color-red p5-0" 
						*ngIf="loginForm.controls.email.errors">
						Invalid E-Mail.
					</div>
					<div class="fz12 color-red p5-0" 
						*ngIf="loginForm.controls.password.errors">
						Password is required.
					</div>
				</div>
				<div class="p10">
					<button class="p0-10 pt5 pb5">Login</button>
					<span class="tdu fr curp"
						(click)="modalState = 'register'">Register</span>
				</div>
			</form>

			<form (submit)="register($event)" 
				*ngIf="modalState === 'register'">
				<div class="p10">
					<label for="email">E-Mail:</label>
					<input class="w200" id="email" type="text" 
						placeholder="email@example.com"
						ngControl="email">
				</div>
				<div ngControlGroup="matchingPasswords">
					<div class="p10">
						<label for="password">Password:</label>
						<input class="w200" id="password" type="password"
							ngControl="password">
					</div>
					<div class="p10">
						<label for="repassword">Re-Enter Password:</label>
						<input class="w200" id="repassword" type="password"
							ngControl="rePassword">
					</div>
				</div>
				<div *ngIf="registerForm.dirty">
					<div class="fz12 color-red p5-0" 
						*ngIf="registerForm.controls.email.errors">
						Invalid E-Mail.
					</div>
					<div class="fz12 color-red p5-0" 
						*ngIf="registerForm.controls.matchingPasswords.errors">
						Passwords do not match.
					</div>
					<div class="fz12 color-red p5-0" 
						*ngIf="registerForm.controls.matchingPasswords.controls.password.errors">
						Password is required.
					</div>
					<div class="fz12 color-red p5-0" 
						*ngIf="registerForm.controls.matchingPasswords.controls.rePassword.errors">
						Matching Password is required.
					</div>
				</div>
				<div class="p10">
					<button class="p0-10 pt5 pb5">Register</button>
					<span class="tdu fr curp" 
						(click)="modalState = 'login'">Login</span>
				</div>
			</form>
		</div>
	</span>
</div>
	`,
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