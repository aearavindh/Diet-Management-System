import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../user.service';
import { FullUser } from '../../model/full-user.model';
import { User } from '../../model/user.model';
import { DailyLog } from '../../model/daily-log.model';

@Component({
  selector: 'app-daily-log',
  templateUrl: './daily-log.component.html',
  styleUrls: ['./daily-log.component.css']
})
export class DailyLogComponent implements OnInit {
	
  isLoading = false;
  formDisabled = false;
  alert: string = null;
  type: string = null;
  status: string = null;
  user: User = null;
  date: string = null;
  dailyLogs: DailyLog[];
  filteredLogs: DailyLog[];
  //Motivator
  motivator: FullUser;
  users: FullUser[];
  usersArray: string[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
	  this.getUser();
	  this.getDate();
	  if(this.user.role === 'Administrator' || this.user.role === 'Motivator'){
		this.isLoading = true;
	    this.getLogs();
	  }
	  if(this.user.role === 'Motivator'){
		  this.isLoading = true;
		  this.prepareForMotivator();
	  }
  }
  
  prepareForMotivator(){
	  this.userService.fetchUser().subscribe( user => this.motivator = user,
		            error => {this.isLoading = false;},
					() => {
						this.userService.fetchUsers().subscribe(users => this.users = users,error =>{this.isLoading=false},
						      () => {
								  this.users = this.users.filter(user => user.batchName===this.motivator.batchName);
								  for(var i in this.users){
									  this.usersArray.push(this.users[i].email);
								  }
								  this.filteredLogs = this.filteredLogs.filter(log => this.usersArray.includes(log.email));
							  });
						this.isLoading = false;
					}
	                 );
  }
  
  getLogs(){
	  this.userService.getLogs().subscribe( logs => this.dailyLogs = logs,
	            error => {this.alert = 'An error occured while fetching the logs';this.type = 'failure';this.isLoading = false;},
	            () => { this.isLoading = false;
                        this.filteredLogs = this.dailyLogs.filter(log => this.date === log.date);
						}
	             );
  }
  
  getUser(){
	  this.user = JSON.parse(localStorage.getItem('user'));
  }
  
  getDate(){
	  var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    this.date = [day, month, year].join('-');
  }
  
  onSubmit(form: NgForm){
	  this.isLoading = true;
	  this.formDisabled = true;
	  
	  let dailyLog = new DailyLog(this.user.username, this.date, form.value.breakfast, form.value.lunch,
	                              form.value.dinner, form.value.fruits, form.value.vegetables, form.value.workouts);
	  
	  this.userService.addLog(dailyLog).subscribe(status => this.status = status,
	                   error => {this.alert = 'An error occured while updating the log. Please try again later';this.type = 'failure';this.isLoading = false;this.formDisabled=false},
					   () => {
						   if(this.status === 'Success'){
							   this.alert = 'Log updated successfully';
							   this.type = 'success';
							   this.isLoading = false;
							   this.formDisabled = false;
							   form.reset();
						   }
					   }
					   );
  }
  
  onHandleAlert(){
	  this.alert = null;
	  this.type = null;
	  this.status = null;
  }	  

}
