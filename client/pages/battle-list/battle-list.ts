import 'reflect-metadata';
import {Component, NgZone} from '@angular/core';
// import {Router} from '@angular/router';
import {Router, RouterLink, RouteParams} from '@angular/router-deprecated';
import {Battles} from '../../../lib/collections/battles';
import {RequireUser} from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';
@Component({
	selector: 'battle-list',
	templateUrl: 'client/pages/battle-list/battle-list.html',
	directives: [RouterLink]
})
@RequireUser()
export class BattleList extends MeteorComponent {
	router: Router;
	battleId: string;

	campaign: any;

	battles: Mongo.Cursor<Object>;

	constructor(zone: NgZone, params: RouteParams, _router: Router) {
		super();
		this.router = _router;
		this.autorun(() => {
			this.battleId = params.get('battleId');
			this.campaign = Session.get('campaign');
			if (this.campaign)
				this.subscribe('battles', this.campaign._id, () => {
						this.battles = Battles.find({}, { sort: { createdDate: 1 } });
				}, true);
			else
				this.router.navigate(['/CampaignList']);
		}, true);
	}

	addBattle() {
		var _id = Meteor.call('insertBattle', {
			name: 'new battle',
			campaignId: this.campaign._id,
			combatants: []
		});
	}
}