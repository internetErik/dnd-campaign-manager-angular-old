import {Component, NgZone} from 'angular2/core';

import {RouterLink, Router, RouteParams} from 'angular2/router';

import {Battles} from 'lib/collections/battles';

import {RequireUser} from 'meteor-accounts';

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
		this.battleId = params.get('battleId');

		this.router = _router;

		Tracker.autorun(() => zone.run(() => {
			this.campaign = Session.get('campaign');
		}));

		this.subscribe('battles', () => { 
			if (this.campaign) {
				Meteor.subscribe('battles', this.campaign._id);
				this.battles = Battles.find({ campaignId: this.campaign._id }, 
					{ sort: { createdDate: 1 } });
			}
			else
				this.router.parent.navigate(['/CampaignList']);
		}, true);
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