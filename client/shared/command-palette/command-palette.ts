import {Component} from 'angular2/core';

@Component({
  selector: 'command-palette',
  template: `
    <section 
      class="t50 w50% p20 horizontal-align-fixed add-shadow z1 bgc-white dn"
      [class.db]="visible">
      <form>
      <input type="text" (submit)="performCommand()" 
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

  input: any;
  
  constructor() {
    this.input = document.querySelector('.js-command-palette-input');
    
    document.querySelector('body')
      .addEventListener('keyup', this.togglePalette.bind(this));
  }

  togglePalette(e: any) {
    if (e.ctrlKey && e.altKey && e.keyCode == 80) {
      this.visible = true;
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