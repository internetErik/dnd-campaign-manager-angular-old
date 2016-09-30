import { ModuleWithProviders } from '@angular/core'
import { 
  Routes, 
  RouterModule, 
}                              from '@angular/router'
import {HomePage}              from './pages/home-page/home-page'
import {CampaignList}          from './pages/campaign-list/campaign-list'
import {CampaignForm}          from './pages/campaign-form/campaign-form'
import {ContentCreator}        from './pages/content-creator/content-creator'
import {CharacterList}         from './pages/character-list/character-list'
import {CharacterForm}         from './pages/character-form/character-form'
import {CharacterDetail}       from './pages/character-detail/character-detail'
import {BattleList}            from './pages/battle-list/battle-list'
import {CombatDisplay}         from './pages/combat-display/combat-display'

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'campaign',
    component: CampaignList,
  },{
    path: 'campaign/add',
    component: CampaignForm,
    },
    {
    path: 'content-create',
    component: ContentCreator,
    },
  {
    path: 'character',
    component: CharacterList,
  },{
      path: 'character/add',
      component: CharacterForm,
    },
    {
      path: 'character/:characterId',
      component: CharacterDetail,
    },
  {
    path: 'battle',
    component: BattleList,
  },{
      path: 'battle/:battleId',
      component: CombatDisplay,
    },
];
 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes) 