import { Component } from '@angular/core';
import { Campaigns } from '../../../lib/collections/campaigns';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
@Component({
	selector: 'campaign-list',
	template: `
<h1>Select a Campaign</h1>
<hr>
<section class="p20-0 m20-0">
	<div *ngFor="let campaign of campaigns" class="p10-0">
		<a href="javascript:void(0)" 
			(click)="selectCampaign(campaign)">
			{{campaign.name}}
		</a>
		<button (click)="deleteCampaign($event, campaign)">-</button>
	</div>

	<a [routerLink]="['/CampaignForm']"><button>+</button></a>
</section>
	`
})
@InjectUser('currentUser')
export class CampaignList extends MeteorComponent {
	campaigns: Mongo.Cursor<any>;
	currentUser: any;

	constructor() {
		super();
		this.subscribe('campaigns', () => {
			this.campaigns = Campaigns.find();
		}, true);
	}

	deleteCampaign(e, campaign) {
		e.preventDefault();
		if (confirm(`Are you sure you want to delete this campaign?`))
			this.call('removeCampaign', campaign._id);
	}

	selectCampaign(campaign) {
		Session.set('campaign', campaign);
	}
}