import {Injectable} from '@angular/core';
@Injectable()
export class CommandPaletteService {
  static registered = {};
  //components register actions they want to have performed in here
  static registerAction(name, fn) {
    this.registered[name] = fn;
  }
  //this is called by command palette
  static performAction(name, argsAr) {
    if(this.registered[name])
      this.registered[name].apply(this, argsAr);
    else
      console.log(`Warning! No action under name '${name}'!`);
  }
}