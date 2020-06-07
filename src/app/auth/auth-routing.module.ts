import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { 
    path: '', 
	component: AuthComponent,
    children: [
	{
    path: '',
    component: LoginComponent
    },
	{
    path: 'register',
    component: RegisterComponent
    },
    {
    path: 'forgot-password',
    component: ForgotPasswordComponent
    },
    {
    path: 'change-password',
    component: ChangePasswordComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }