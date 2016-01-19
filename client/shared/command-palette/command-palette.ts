import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

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
    </section>
  `
})
export class CommandPalette {
  visible: boolean = false;
  command: string = '';
  router: Router;
  input: any;

  commands: any[] = [
    { text: 'characters', command: function() { this.router.navigate('/CharacterList'); } }
  ];
  
  constructor(_router: Router) {
    this.router = _router;
    
    this.input = document.querySelector('.js-command-palette-input');
    
    document.querySelector('body')
      .addEventListener('keyup', this.togglePalette.bind(this));
  }

  togglePalette(e: any) {
    if (e.ctrlKey && e.altKey && e.keyCode == 80) {
      this.visible = !this.visible;
      setTimeout(() => this.input.focus(), 0);
    }
    else if (e.keyCode == 27) {
      this.command = '';
      this.visible = false;
    }
  }

  keyboardEvent(e) {
    e.preventDefault();
  }

  performCommand() {
    console.log(this.command);
  }
}