import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { TypeaheadDemoComponent } from './typeahead/typeahead.component.ts';
import { DataResolver } from './app.resolver';
import { LoadsComponent } from './loads';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'drivers/:id', component: DriversComponent },
  { path: 'loads', component: LoadsComponent },
  { path: 'typeahead', component: TypeaheadDemoComponent },
  { path: '**',    component: NoContentComponent },
];
