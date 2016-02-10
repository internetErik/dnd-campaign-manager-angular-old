import {Component, EventEmitter} from 'angular2/core';

@Component({
  selector: 'character-jump-menu',
  inputs: ['saveMessage'],
  outputs: ['characterSaved'],
  template: `
<div class="jump-menu p10 r0 vertical-align-fixed bgc-white add-shadow">
  <ul>
    <li class="p5-0"><a href="#name">Name</a></li>
    <li class="p5-0"><a href="#religion">Religion/Morals</a></li>
    <li class="p5-0"><a href="#biological">Biological Information</a></li>
    <li class="p5-0"><a href="#equipment">Equipment</a></li>
    <li class="p5-0"><a href="#general">General Attributes</a></li>
    <li class="p5-0"><a href="#combat">Combat Attributes</a></li>
    <li class="p5-0"><a href="#magic">Magic</a></li>
      <li class="p5-0 pl10"><a href="#spelllist">Spell List</a></li>
    <li class="p5-0"><a href="#skills">Skills</a></li>
    <li class="p5-0"><a href="#feats">Feats</a></li>
    <li class="p5-0"><a href="#notes">Notes</a></li>
    <li class="p5-0"><a href="#backstory">Backstory</a></li>
  </ul>
  <button (click)="saveCharacter($event)">Save</button> {{saveMessage}}
</div>
  `
})
export class CharacterJumpMenu {
  saveMessage: string;
  characterSaved: EventEmitter<any> = new EventEmitter();
  saveCharacter(e) {
    e.preventDefault();
    this.characterSaved.emit(void (0));
  }
}