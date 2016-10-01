import { HomePage }          from './pages/home-page/home-page'
import { CampaignList }      from './pages/campaign-list/campaign-list'
import { CampaignForm }      from './pages/campaign-form/campaign-form'
import { ContentCreator }    from './pages/content-creator/content-creator'
import { CharacterList }     from './pages/character-list/character-list'
import { CharacterForm }     from './pages/character-form/character-form'
import { CharacterDetail }   from './pages/character-detail/character-detail'
import { BattleList }        from './pages/battle-list/battle-list'
import { CombatDisplay }     from './pages/combat-display/combat-display'

import { CharacterJumpMenu } from './pages/character-detail/character-jump-menu/character-jump-menu'
import { FeatList }          from './components/feat-list/feat-list'
import { MonsterForm }       from './components/monster-form/monster-form'
import { SkillList }         from './components/skill-list/skill-list'
import { SpellFilter }       from './components/spell-filter/spell-filter'
import { SpellList }         from './components/spell-list/spell-list'
import { BattleForm }        from './pages/combat-display/battle-form/battle-form'
import { CombatActions }     from './pages/combat-display/combat-actions/combat-actions'
import { CombatActionInput } from './pages/combat-display/combat-actions/combat-action-input/combat-action-input'
import { CombatInitializer } from './pages/combat-display/combat-initializer/combat-initializer'
import { CombatantAdder }    from './pages/combat-display/combat-initializer/combatant-adder/combatant-adder'
import { CombatantList }     from './pages/combat-display/combat-initializer/combatant-list/combatant-list'
import { CombatPhase }       from './pages/combat-display/combat-phase/combat-phase'

import { CommandPalette }    from './shared/command-palette/command-palette'
import { DiceHelper }        from './shared/dice-helper/dice-helper'
import { Navigation }        from './shared/navigation/navigation'
import { AccountsModal }     from './shared/navigation/accounts-modal/accounts-modal'

import { AppComponent }      from './app.component'

const pages: any = [
  HomePage,
  CampaignList,
  CampaignForm,
  ContentCreator,
  CharacterList,
  CharacterForm,
  CharacterDetail,
  BattleList,
  CombatDisplay,
]

const components: any = [
  FeatList,
  MonsterForm,
  SkillList,
  SpellFilter,
  SpellList,
  BattleForm,
  CombatActions,
  CombatActionInput,
  CombatInitializer,
  CombatantAdder,
  CombatantList,
  CombatPhase,
  CharacterJumpMenu,
]

const sharedComponents: any = [
  CommandPalette,
  DiceHelper,
  Navigation,
  AccountsModal,
]

const app: any = [ AppComponent ]

export const declarations = app.concat(pages, sharedComponents, components)