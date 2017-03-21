import { NgModule } from '@angular/core';
import { CompanyEditComponent, CompanyDetailComponent, CompanyEditInfoComponent } from './components';
import { CompaniesComponent } from './companies.component';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../guards';
import { EmptyComponent } from '../shared/components/empty';

const routes: Routes = [{
  path: '',
  component: CompaniesComponent,
  children: [
    {
      path: '0',
      children: [
        {
          path: '',
          component: EmptyComponent,
          outlet: 'detailOutlet',
        },
        {
          path: 'edit',
          component: CompanyEditComponent,
          data: { new: true },
          canDeactivate: [CanDeactivateGuard]
        }
      ]
    },
    {
      path: ':id',
      children: [
        {
          path: '',
          component: CompanyDetailComponent,
          outlet: 'detailOutlet',
        },
        {
          path: '',
          component: EmptyComponent,
          canDeactivate: [CanDeactivateGuard]
        },
        {
          path: 'edit-info',
          component: CompanyEditInfoComponent,
          canDeactivate: [CanDeactivateGuard]
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
