import { NgModule }         from '@angular/core'
import { BrowserModule }    from '@angular/platform-browser'
import { HttpModule }       from '@angular/http'
import { 
  FormsModule, 
  ReactiveFormsModule,
}                           from '@angular/forms'
import { METEOR_PROVIDERS } from 'angular2-meteor'
import { AppComponent }     from './app.component'
import { routing }          from './app.routes'
import { declarations }     from './app.component-declarations' 

@NgModule({
  imports     : [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
  ],
  declarations: declarations,
  providers   : [ METEOR_PROVIDERS ],
  bootstrap   : [ AppComponent ],
})
export class AppModule {}