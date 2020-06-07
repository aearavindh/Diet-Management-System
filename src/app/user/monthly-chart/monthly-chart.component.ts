import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../user.service';
import { FullUser } from '../../model/full-user.model';
import { User } from '../../model/user.model';
import { MonthlyChart } from '../../model/monthly-chart.model';

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.css']
})
export class MonthlyChartComponent implements OnInit {

  isLoading = false;
  formDisabled = false;
  alert: string = null;
  type: string = null;
  status: string = null;
  user: User = null;
  selectedMonth: string;
  monthlyCharts: MonthlyChart[];
  filteredCharts: MonthlyChart[];
   //Motivator
  motivator: FullUser;
  users: FullUser[];
  usersArray: string[];
  attribute: string;
  data: number[] = [0,0,0];
  label: string[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
	  this.getUser();
	  this.getDetails();
	  if(this.user.role === 'Administrator' || this.user.role === 'Motivator'){
		this.isLoading = true;
	    this.getCharts();
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
								  this.filteredCharts = this.filteredCharts.filter(chart => this.usersArray.includes(chart.email));
							  });
						this.isLoading = false;
					}
	                 );
  }
  
  getUser(){
	  this.user = JSON.parse(localStorage.getItem('user'));
  }
  
  getCharts(){
	  this.userService.getCharts().subscribe( charts => this.monthlyCharts = charts,
	            error => {this.alert = 'An error occured while fetching the charts';this.type = 'failure';this.isLoading = false;},
	            () => { 
				       this.isLoading = false;
                       this.filteredCharts = this.monthlyCharts.filter(chart => this.selectedMonth === chart.month);
					   }
	             );
  }
  
  getDetails(){
	  var q = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	  let d = new Date().getMonth();
	  this.selectedMonth = q[d];
	  if(this.user.role !== 'Challenger'){
	  if(d<3)
		  this.label = ['January','February','March'];
	  else if(d<6)
	      this.label = ['April','May','June'];
	  else if(d<9)
		  this.label = ['July','August','September'];
	  else 
		  this.label = ['October','November','December'];
	  }
  }
  
  onSubmit(form: NgForm){
	  this.isLoading = true;
	  this.formDisabled = true;
	  
	  let monthlyChart = new MonthlyChart(this.user.username, this.selectedMonth, form.value.weight, form.value.height, form.value.chest,
	                                    form.value.waist, form.value.shoulders, form.value.biceps, form.value.forearm, form.value.leg,
									  form.value.thighs);							  
	
	  
	  this.userService.addChart(monthlyChart).subscribe(status => this.status = status,
	                   error => {this.alert = 'An error occured while updating the chart. Please try again later';this.type = 'failure';this.isLoading = false;this.formDisabled=false},
					   () => {
						   if(this.status === 'Success'){
							   this.alert = 'Chart updated successfully';
							   this.type = 'success';
							   this.isLoading = false;
							   this.formDisabled = false;
							   form.reset();
						   }
					   }
					   );
  }
  
  getChart(monthlyChart: MonthlyChart, attribute: string){
	  
	  let sameData: MonthlyChart[] = this.monthlyCharts.filter(chart => monthlyChart.email === chart.email);
	  
	  let a = ['January','April','July','October'];
	  let b = ['February','May','August','November'];
	  let c = ['March','June','September','December'];  
	  
	  for(var i in sameData){
		  if(a.includes(sameData[i].month)){
			  this.data[0] = this.getAttributeValue(sameData[i], attribute);
		  }else if(b.includes(sameData[i].month)){
			  this.data[1] = this.getAttributeValue(sameData[i], attribute);
		  }else if(c.includes(sameData[i].month)){
			  this.data[2] = this.getAttributeValue(sameData[i], attribute);
		  }			  
	  }
	  
	  this.attribute = attribute;
  }
  
  getAttributeValue(monthlyChart: MonthlyChart, a: string): number{
	  if(a==='Weight')
		  return parseInt(monthlyChart.weight);
	  else if(a==='Height')
		  return parseInt(monthlyChart.height);
	  else if(a==='Chest')
		  return parseInt(monthlyChart.chest);
	  else if(a==='Waist')
		  return parseInt(monthlyChart.waist);
	  else if(a==='Shoulders')
		  return parseInt(monthlyChart.shoulders);
	  else if(a==='Biceps')
		  return parseInt(monthlyChart.biceps);
	  else if(a==='Forearm')
		  return parseInt(monthlyChart.forearm);
	  else if(a==='Leg')
		  return parseInt(monthlyChart.leg);
	  else if(a==='Thighs')
		  return parseInt(monthlyChart.thighs);
  }
  
  onHandleAlert(){
	  this.alert = null;
	  this.type = null;
	  this.status = null;
  }	  
  onHandleChart(){
	  this.attribute = null;
  }

}
