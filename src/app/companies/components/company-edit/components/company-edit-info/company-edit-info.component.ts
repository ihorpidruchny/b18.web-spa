import { Component, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Company, CompanyStatuses, CompanyTypes } from '../../../../../models';
import { BaseRootEditComponent } from '../../../../../base';
import { CompanyActions } from '../../../../../actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState, selectDetailCompany } from '../../../../../store';
import { CompanyInfoForm } from '../../../../../forms';

@Component({
  selector: 'company-edit-info',
  templateUrl: './company-edit-info.component.html',
  styleUrls: ['./company-edit-info.component.scss']
})
export class CompanyEditInfoComponent extends BaseRootEditComponent<Company>{
  @ViewChild(CompanyInfoForm) companyInfoFormComponent: CompanyInfoForm;
  private anchors = [{
    id: '',
    title: 'Basic information'
  }, {
    id: '',
    title: 'Adresses'
  }, {
    id: '',
    title: 'Contacts'
  }];

  constructor(
    cdr: ChangeDetectorRef,
    companyActions: CompanyActions,
    route: ActivatedRoute,
    location: Location,
    router: Router,
    ngRedux: NgRedux<IAppState>) {
    super(companyActions, ngRedux.select(selectDetailCompany),
      ngRedux.select(state => state.ui.companies.isLoading), route, router, location, cdr);
  }

  isDetailsChanged() {
    return this.companyInfoFormComponent && this.companyInfoFormComponent.companyForm.dirty;
  }

  getItemName() {
    return 'Company';
  }
}
