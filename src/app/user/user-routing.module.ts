import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserComponent } from './user.component';

import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RequestsComponent } from './requests/requests.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { DailyLogComponent } from './daily-log/daily-log.component';
import { MonthlyChartComponent } from './monthly-chart/monthly-chart.component';
import { MessageComponent } from './message/message.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { 
    path: '', 
	component: UserComponent,
	canActivate: [AuthGuard],
    children: [
	{ 
    path: '', 
	component: HomeComponent
	},
	{ 
    path: 'home', 
	component: HomeComponent
	},
	{ 
    path: 'change-password', 
	component: ChangePasswordComponent
	},
	{ 
    path: 'requests', 
	component: RequestsComponent
	},
	{
	path: 'manage-users',
	component: ManageUsersComponent
	},
	{
	path: 'daily-log',
	component: DailyLogComponent
	},
	{
	path: 'monthly-chart',
	component: MonthlyChartComponent
	},
	{
	path: 'post',
	component: PostComponent
	},
	{
	path: 'message',
	component: MessageComponent
	}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }