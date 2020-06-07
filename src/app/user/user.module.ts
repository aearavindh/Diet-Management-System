import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

import { UserService } from './user.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RequestsComponent } from './requests/requests.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MessageComponent } from './message/message.component';
import { PostComponent } from './post/post.component';
import { DailyLogComponent } from './daily-log/daily-log.component';
import { MonthlyChartComponent } from './monthly-chart/monthly-chart.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [UserComponent, HeaderComponent, HomeComponent, ChangePasswordComponent, RequestsComponent, ManageUsersComponent, MessageComponent, PostComponent, DailyLogComponent, MonthlyChartComponent, AddUserComponent, ModifyUserComponent, ChartComponent],
  imports: [
    CommonModule,
	FormsModule,
	SharedModule,
	UserRoutingModule,
	HttpClientModule
  ],
  providers: [UserService]
})
export class UserModule { }
