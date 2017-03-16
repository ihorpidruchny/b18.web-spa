import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BdFormsModule } from '../forms/forms.module';

import {
  AuthWrapperComponent,
  LoginComponent,
  RegisterComponent,
  PhoneConfirmationComponent,
  EmailWasSentComponent,
  EmailConfirmationComponent,
  AuthGeneralFormErrorComponent,
  AuthFormMessageHelperComponent,
  PasswordRecoveryComponent,
  TestFormComponent
 } from './components';
import {
  LoginFormComponent,
  RegisterFormComponent,
  PhoneConfirmationFormComponent,
  PasswordRecoveryFormComponent
} from './forms';
import { AuthGuard } from './guards';
import { AuthenticationService } from './services';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    BdFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthWrapperComponent,
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PhoneConfirmationComponent,
    PhoneConfirmationFormComponent,
    EmailConfirmationComponent,
    EmailWasSentComponent,
    AuthGeneralFormErrorComponent,
    AuthFormMessageHelperComponent,
    PasswordRecoveryComponent,
    PasswordRecoveryFormComponent,
    TestFormComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  exports: [
  ]
})
export class AuthModule { }
