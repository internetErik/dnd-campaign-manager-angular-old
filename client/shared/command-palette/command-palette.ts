import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Characters} from 'lib/collections/characters';
import {MeteorComponent} from 'angular2-meteor';

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
      *ngFor="#command of commands"
      (click)="performCommand(command)"
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
  campaign: any;
  character: any;

  characters: Mongo.Cursor<Object>;

  possibleCommands: any[] = [
    {
      text: 'Home',
      command: () => this.router.navigate(['/HomePage'])
    },
    {
      text: 'Campaigns',
      command: () => this.router.navigate(['/CampaignList'])
    },
    {
      text: 'Content Creator',
      command: () => this.router.navigate(['/ContentCreator'])
    },
    {
      text: 'Characters',
      condition: () => this.campaign,
      command: () => this.router.navigate(['/CharacterList'])
    },
    {
      text: 'Battles',
      condition: () => this.campaign,
      command: () => this.router.navigate(['/BattleList'])
    }
  ];

  characterCommands: any[] = [
    {
      text: 'Character Detail',
      condition: () => this.character,
      command: () => this.router.navigate(['/CharacterDetail', {characterId: this.character._id}])
    }
  ];

  charactersCommands: any[] = [];

  commands: any[] = [];
  
  constructor(_router: Router) {
    super();
    this.router = _router;
    this.autorun(() => {
      this.campaign = Session.get('campaign');
      this.character = Session.get('character');
      if(this.campaign)
        this.subscribe('characters', () => {
          this.characters = Characters.find({ campaignId: this.campaign._id });
          this.charactersCommands = 
            this.characters.map(this._charactersFunctionFactory.bind(this));
        }, true);
    }, true);
    
    document.querySelector('body')
      .addEventListener('keyup', this.togglePalette.bind(this));
  }

  _charactersFunctionFactory(character) {
    console.dir(character);
    var func = () => 
      this.router.navigate(['/CharacterDetail', { characterId: character._id }]);

    return {
      text: `Character Detail - ${character.firstName} ${character.lastName}`,
      command: func
    }
  }

  togglePalette(e: any) {
    var input: HTMLInputElement = 
      <HTMLInputElement> document.querySelector('.js-command-palette-input');

    if (e.ctrlKey && e.altKey && e.keyCode == 80) {
      this.visible = !this.visible;
      setTimeout(() => input.focus(), 0);
    }
    else if (e.keyCode == 27)
      this.closePalette();
  }

  closePalette(): void {
    this.command = '';
    this.commands = [];
    this.visible = false;
  }

  keyboardEvent(e) {
    e.preventDefault();
    if (this.command.length > 0)
      this.commands = this.possibleCommands.concat(this.characterCommands, this.charactersCommands)
        .filter((i) => {
          var condition = (i.condition) ? i.condition : () => true;
          return condition() && 
            i.text.toLowerCase().indexOf(this.command.toLowerCase()) > -1;
        });
    else
      this.commands = [];
  }

  performCommand(command?: any) {
    if (this.commands.length > 0) {
      command ? command.command() : this.commands[0].command();
      this.closePalette();
    }
  }
}