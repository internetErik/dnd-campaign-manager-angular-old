/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts.d.ts" />

import {Component, View, NgZone} from 'angular2/angular2';

import {RouterLink, Router, RouteParams} from 'angular2/router';

import {Battles} from 'collections/battles';

import {RequireUser} from 'meteor-accounts';

@Component({
	selector: 'battle-list'
})
@View({
	templateUrl: 'client/battle-list/battle-list.html',
	directives: [RouterLink]
})
@RequireUser()
export class BattleList {
	// combat phases
	//-1 = not started
	// 0 = decide action
	// 1 = roll init
	// 2 = resolve round
	router: Router;
	battleId: string;

	campaign: any;

	battles: Mongo.Cursor<Object>;

	constructor(zone: NgZone, params: RouteParams, _router: Router) {
		this.battleId = params.get('battleId');
		this.router = _router;

		Tracker.autorun(() => zone.run(() => {
			this.campaign = Session.get('campaign');
			if (this.campaign) {
				Meteor.subscribe('battles', this.campaign._id);
				this.battles = Battles.find({ campaignId: this.campaign._id }, { sort: { createdAt: -1 } });
			}
			else
				this.router.parent.navigate(['/CampaignList']);
		}));
	}

	addBattle() {
		var _id = Meteor.call('insertBattle', {
			name: 'new battle',
			campaignId: this.campaign._id,
			combatants: []
		});

		this.router.parent.navigate(['/CombatDisplay', { battleId: _id }]);
	}
}