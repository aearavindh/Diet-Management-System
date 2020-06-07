import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { AuthRoutingModule } from './auth-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';


import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AuthComponent, RegisterComponent, ForgotPasswordComponent, ChangePasswordComponent, LoginComponent],
  imports: [
    CommonModule,
	FormsModule,
	SharedModule,
	AuthRoutingModule,
	HttpClientModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
