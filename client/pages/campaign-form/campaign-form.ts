import 'reflect-metadata';
import {Component} from '@angular/core';
import {FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
import {Router} from '@angular/router';
import {Campaigns} from '../../../lib/collections/campaigns';
import {RequireUser, InjectUser} from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
@Component({
	selector: 'campaign-form',
	templateUrl: 'client/pages/campaign-form/campaign-form.html'
})
@RequireUser()
@InjectUser('currentUser')
export class CampaignForm extends MeteorComponent {
	campaignForm: ControlGroup;
	router: Router;
	currentUser: any;

	constructor(_router: Router) {
		super();
		var fb = new FormBuilder();
		this.campaignForm = fb.group({
			name: ['', Validators.required]
		});

		this.router = _router;
	}

	addCampaign(e, campaign) {

		if(this.campaignForm.valid) {		
			this.call('insertCampaign', campaign, (e, r) => {
				if(e)
					console.log("Error creating campaign: ", e);
				else
					this.router.navigate(['/CampaignList']);
			});
		}
	}
}