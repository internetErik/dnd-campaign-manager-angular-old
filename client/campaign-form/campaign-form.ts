/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts.d.ts" />

import {Component} from 'angular2/core';
import {FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';

import {Router} from 'angular2/router';

import {Campaigns} from 'collections/campaigns';


import {RequireUser} from 'meteor-accounts';

@Component({
	selector: 'campaign-form',
	templateUrl: 'client/campaign-form/campaign-form.html'
})
@RequireUser()
export class CampaignForm {
	campaignForm: ControlGroup;
	router: Router;

	constructor(_router: Router) {
		var fb = new FormBuilder();
		this.campaignForm = fb.group({
			name: ['', Validators.required]
		});

		this.router = _router;
	}

	addCampaign(e, campaign) {

		if(this.campaignForm.valid) {
			Meteor.call('insertCampaign', campaign, (e, r) => {
			if(e)
				console.log("Error creating campaign: ", e);
			else
				this.router.parent.navigate(['/CampaignList']);
			});
		}
		else
			console.log("form not valid");

	}
}