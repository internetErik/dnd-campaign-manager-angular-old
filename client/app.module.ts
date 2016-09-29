import { NgModule }         from '@angular/core'
import { HttpModule }       from '@angular/http'
import { 
  FormsModule, 
  ReactiveFormsModule,
}                           from '@angular/forms'
import { METEOR_PROVIDERS } from 'angular2-meteor'
import { HomePage }         from './pages/home-page/home-page'
import { CampaignList }     from './pages/campaign-list/campaign-list'
import { CampaignForm }     from './pages/campaign-form/campaign-form'
import { ContentCreator }   from './pages/content-creator/content-creator'
import { CharacterList }    from './pages/character-list/character-list'
import { CharacterForm }    from './pages/character-form/character-form'
import { CharacterDetail }  from './pages/character-detail/character-detail'
import { BattleList }       from './pages/battle-list/battle-list'
import { CombatDisplay }    from './pages/combat-display/combat-display'
import { AppComponent }     from './app.component'
import { routing }          from './app.routes'

@NgModule({
  imports     : [
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
  ],
  declarations: [
    HomePage,
    CampaignList,
    CampaignForm,
    ContentCreator,
    CharacterList,
    CharacterForm,
    CharacterDetail,
    BattleList,
    CombatDisplay,
    AppComponent,
  ],
  providers   : [ METEOR_PROVIDERS ],
  bootstrap   : [ AppComponent ],
})
export class AppModule {}