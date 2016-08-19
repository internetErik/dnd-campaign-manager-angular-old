import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { AppComponent } from './app.component';
import {bootstrap} 					from 'angular2-meteor-auto-bootstrap';

bootstrap(AppComponent, [  
  disableDeprecatedForms(),
  provideForms(),
  APP_ROUTER_PROVIDERS
]);