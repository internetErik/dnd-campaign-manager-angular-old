import 'reflect-metadata';
import {Component} from '@angular/core';
// import {Router} from '@angular/router';
import {Router} from '@angular/router-deprecated';
import {Characters} from '../../../lib/collections/characters';
import {Campaigns} from '../../../lib/collections/campaigns';
import {MeteorComponent} from 'angular2-meteor';
import {CommandPaletteService} from '../../services/command-palette-service';
@Component({
    selector: 'command-palette',
    template: `
<section 
  class="t50 w50% p20 horizontal-align-fixed add-shadow z1 bgc-white dn"
  [class.db]="visible">
  <form (submit)="performCommand()">
    <input type="text"
      [(ngModel)]="command"
      (keyup)="keyboardEvent($event)"
      class="js-command-palette-input max-width h40 p0-20 fz18"/>
  </form>
  <section 
    *ngIf="commands.length > 0"
    class="posa t100 l0 curp max-width bgc-white add-shadow">
    <div
      *ngFor="let command of commands; let i = index"
      (click)="performCommand(command)"
      [class.bgc-lightgray]="i === curIndex"
      class="p20 bb1-s-black bgc-lightgray:h">
      {{command.text}}
    </div>
  </section>
</section>
  `
})
export class CommandPalette extends MeteorComponent {
  visible: boolean = false;
  command: string = '';
  router: Router;
  curIndex: number = -1;
  campaign: any;
  character: any;

  characters: Mongo.Cursor<Object>;
  campaigns: Mongo.Cursor<Object>;

  homePath           : RegExp = new RegExp('^\/$', 'i');
  campaignListPath   : RegExp = new RegExp('^\/campaign$', 'i');
  characterDetailPath: RegExp = new RegExp('^\/character\/.', 'i');
  characterListPath  : RegExp = new RegExp('^\/character$', 'i');
  contentCreatorPath : RegExp = new RegExp('^\/content-create$', 'i');
  battleListPath     : RegExp = new RegExp('^\/battle$', 'i');
  battleDetailPath   : RegExp = new RegExp('^\/battle\/.', 'i');

  possibleCommands: any[] = [
    {
      text: 'Home',
      condition: () => !this.homePath.test(location.pathname),
      command: () => this.router.navigate(['/HomePage'])
    },
    {
      text: 'Campaigns',
      condition: () => !this.campaignListPath.test(location.pathname),
      command: () => this.router.navigate(['/CampaignList'])
    },
    {
      text: 'Content Creator',
      condition: () => !this.contentCreatorPath.test(location.pathname),
      command: () => this.router.navigate(['/ContentCreator'])
    },
    {
      text: 'Characters',
      condition: () => this.campaign && !this.characterListPath.test(location.pathname),
      command: () => this.router.navigate(['/CharacterList'])
    },
    {
      text: 'Battles',
      condition: () => this.campaign && !this.battleListPath.test(location.pathname),
      command: () => this.router.navigate(['/BattleList'])
    }
  ];

  characterCommands: any[] = [
    {
      text: 'Character Detail',
      condition: () => this.character,
      command: () => this.router.navigate(['/CharacterDetail', {characterId: this.character._id}])
    },
    {//if we're on a character detail, save the character
      text: 'Character - Save',
      condition: () => this.characterDetailPath.test(location.pathname),
      command: () => CommandPaletteService.performAction('save-character', [])
    }
  ];

  campaignCommands: any[] = [
    {
      text: 'Campaign Unselect',
      condition: () => this.campaign,
      command: () => { 
        Session.set('campaign', null); 
        this.router.navigate(['/CampaignList']);
      }
    }
  ];

  diceCommands: any[] = [
    {
      text: 'dice - clear rolls',
      command: () => CommandPaletteService.performAction('dice-clear-rolls', [])
    },
    {
      text: 'dice - toggle',
      command: () => CommandPaletteService.performAction('dice-toggle', [])
    }
  ];

  campaignsCommands: any[] = [];
  charactersCommands: any[] = [];
  commands: any[] = [];
  
  constructor(_router: Router) {
    super();
    this.router = _router;
    this.autorun(() => {
      this.campaign = Session.get('campaign');
      this.character = Session.get('character');

      this.subscribe('campaigns', () => {
          this.campaigns = Campaigns.find();
          this.campaignsCommands =
            this.campaigns.map(this._campaignsFunctionFactory.bind(this));
      }, true);

      if(this.campaign)
        this.subscribe('characters', () => {
          this.characters = Characters.find({ campaignId: this.campaign._id });
          this.charactersCommands = 
            this.characters.map(this._charactersFunctionFactory.bind(this));
        }, true);
    }, true);

    this.diceCommands = this.diceCommands.concat([2, 4, 6, 8, 10, 12, 20, 100]
                               .map(this._diceFunctionFactory));
    
    document.querySelector('body')
      .addEventListener('keyup', this.togglePalette.bind(this));
  }

  _campaignsFunctionFactory(campaign) {
    var func = () =>
      Session.set('campaign', campaign);

    return {
      text: `Campaign Select - ${campaign.name}`,
      condition: () => this.campaign == null,
      command: func
    }
  }

  _charactersFunctionFactory(character) {
    var func = () =>
      this.router.navigate(['/CharacterDetail', { characterId: character._id }]);

    return {
      text: `Character Detail - ${character.firstName} ${character.lastName}`,
      command: func
    }
  }

  _diceFunctionFactory(sides) {
    var func = () => CommandPaletteService.performAction(`dice-roll-1d${sides}`, []);

    return {
      text: `Dice - roll 1d${sides}`,
      command: func
    }
  }



  togglePalette(e: any) {
    var input: HTMLInputElement = 
      <HTMLInputElement> document.querySelector('.js-command-palette-input');
    if (e.ctrlKey && e.altKey && e.keyCode == 80) { //ctrl+alt+p = command palette
      this.visible = !this.visible;
      setTimeout(() => input.focus(), 0);
    }
    else if (e.ctrlKey && e.altKey && e.keyCode == 83) { //ctrl+alt+s = spell command palette
      //open in spell mode spell menu
    }
    else if (this.visible && e.keyCode == 27) //esc = close palette
      this.closePalette();
  }

  closePalette(): void {
    this.command = '';
    this.commands = [];
    this.visible = false;
    this.curIndex = -1;
  }

  keyboardEvent(e) {
    e.preventDefault();
    if (this.commands.length > 0 && e.keyCode === 38 || e.keyCode === 40)
      this._directionalArrows(e);
    else
      this._lookupCommands();
  }

  _directionalArrows(e) {
    if (this.commands.length === 1)
      this.curIndex = 0;
    else if (e.keyCode === 38)
      this.curIndex = (this.curIndex <= 0) ? 
        this.commands.length-1 : this.curIndex-1;
    else
      this.curIndex = (this.curIndex === this.commands.length-1) ?
        0 : this.curIndex+1;
  }

  _lookupCommands() {
    if (this.command.length > 0) {
      this.commands = this.possibleCommands
        .concat(this.characterCommands, 
                this.charactersCommands,
                this.campaignCommands,
                this.campaignsCommands,
                this.diceCommands)
        .filter((i) => {
          var condition = (i.condition) ? i.condition : () => true;
          return condition() &&
            i.text.toLowerCase().indexOf(this.command.toLowerCase()) > -1;
        });
    }
    else
      this.commands = [];
  }

  performCommand(command?: any) {
    var ndx = (this.curIndex === -1) ? 0 : this.curIndex;
    if (this.commands.length > 0) {
      command ? command.command() : this.commands[ndx].command();
      this.closePalette();
    }
  }
}