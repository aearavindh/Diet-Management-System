import { Component, OnInit, AfterViewInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { UserService } from '../user.service';

import { FullUser } from '../../model/full-user.model';
import { User } from '../../model/user.model';
import { Batch } from '../../model/batch.model';
import { Group } from '../../model/group.model';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  title = '';
  user: User;
  batches: Batch[];
  groups1: Group[];
  groups2: Group[];
  fullUser: FullUser;
  startDate: string;
  endDate: string;
  criteria = ['City','Dietary Custom','Gender'];
  cities = ['CHENNAI','BANGALORE','KOCHI','HYDRABAD','PUNE'];
  dietaryCustom = ['VEG','NON-VEG','VEGAN'];
  gender = ['MALE','FEMALE'];
  selectedCriterion = 'City';
  isLoading = true;
  alert: string = null; 
  type: string = null;
  status: string = null;
  mobileButton = 'Update Mobile';
  
  constructor(private userService: UserService) { 
       this.user = JSON.parse(localStorage.getItem('user'));
       this.getDetails();
  }

  ngOnInit(): void {
	  
  }
  ngAfterViewInit(): void {
	  this.isLoading = false;
  }
  
  getDetails(){
	  var q = ['Q4(Jan-Mar)','Q1(Apr-Jun)','Q2(Jul-Sep)','Q3(Oct-Dec)'];
	  this.title = q[Math.floor(new Date().getMonth() / 3)];
	  
	  if(this.title==='Q4(Jan-Mar)'){
		  this.startDate = '1st January';
		  this.endDate = '31st March';
	  }else if(this.title==='Q1(Apr-Jun)'){
		  this.startDate = '1st April';
		  this.endDate = '30th June';
	  }else if(this.title==='Q2(Jul-Sep)'){
		  this.startDate = '1st July';
		  this.endDate = '30th September';
	  }else if(this.title==='Q3(Oct-Dec)'){
		  this.startDate = '1st October';
		  this.endDate = '31st December';
	  }
	  
      if(this.user.role === 'Administrator'){
		   this.userService.getBatches().subscribe( requests => this.batches = requests,
	                error => {this.isLoading = false;},
		            () => { this.userService.getGroups().subscribe( requests => {
			        this.groups1 = [];
					this.groups2 = [];
			        for(var i in requests){ 
					if(requests[i].batch.id===this.batches[0].id)
			        this.groups1.push(requests[i]);
				    else if(requests[i].batch.id===this.batches[1].id)
					this.groups2.push(requests[i]);
					}
					}
					);});
	  }else if(this.user.role === 'Motivator' || this.user.role === 'Challenger'){
	       this.userService.fetchUser().subscribe( user => this.fullUser = user,
		            error => {this.isLoading = false;},
					() => {this.isLoading = false;}
	                 );
	  }
  }
  
  getReport(batch: string){
	  this.userService.getReport(batch).subscribe(status => this.status = status,
	                error => {this.alert = 'An error occured while fetching the report';this.type = 'failure';this.isLoading = false;},
					() => {
							this.isLoading = false;
							this.alert = this.status;
	                        this.type = 'info';
					}
	                 );
  }
  
  endProgram(){
	  
	  this.userService.endProgram().subscribe(status => this.status = status,
	                error => {this.alert = 'An error occured while ending the program';this.type = 'failure';this.isLoading = false;},
					() => {
						if(this.status==='Success'){
							this.isLoading = false;
							this.getDetails();
							this.alert = 'You ended the current program';
	                        this.type = 'failure';
						}
					}
	                 );
	  
  }
  
  onSubmit(form: NgForm, batch: Batch){
	  this.isLoading = true;
	  let groups: Array<Group> = [];
      groups.push(new Group(form.value.name, batch));
	  
	  this.userService.createGroup(groups).subscribe( status => this.status = status,
	                error => {this.alert = 'An error occured while creating the group. Please try again later';this.type = 'failure';this.isLoading = false;},
					() => {
						if(this.status==='Success'){
							this.isLoading = false;
							this.getDetails();
							form.reset();
							this.alert = 'Group created successfully';
							this.type = 'success';
						}else if(this.status==='Already exists'){
							this.isLoading = false;
							this.getDetails();
							this.alert = 'A group with same name already exists. Please enter different name';
							this.type = 'failure';
						}
					}
	                 );
	  
  }
  
  createGroups(batch: Batch){
	  
	  this.isLoading = true;
	  let gs: Array<Group> = [];
	  let groups: string[];
	  if(this.selectedCriterion==='City')
		  groups = this.cities;
	  else if(this.selectedCriterion==='Dietary Custom')
		  groups = this.dietaryCustom;
	  else if(this.selectedCriterion==='Gender')
		  groups = this.gender;
	  
	  for(var i in groups){
		  let g = new Group(groups[i], batch);
		  gs.push(g);
	  }
	  this.userService.createGroup(gs).subscribe( status => this.status = status,
	                error => {this.alert = 'An error occured while creating the groups. Please try again later';this.type = 'failure';this.isLoading = false;},
					() => { 
                       if(this.status==='Success'){
						   this.isLoading = false;
	                       this.getDetails();
	                       this.alert = 'Groups created successfully';
	                       this.type = 'success';
					   }
					   }
	                 );
	  
  }
  
  refer(form: NgForm){
	  
	  this.isLoading = true;
	  
	  this.userService.refer(form.value.email).subscribe( status => this.status = status,
	                error => {this.alert = 'An error occured while refering the challenger. Please try again later';this.type = 'failure';this.isLoading = false;},
					() => {
						this.isLoading = false;
						if(this.status==='Success'){
							form.reset();
							this.alert = 'Challenger refered successfully';
							this.type = 'success';
						}else if(this.status==='Failure'){
							form.reset();
							this.alert = 'An error occured while refering the challenger. Please try again later';
							this.type = 'failure';
						}
					}
	                 );
	  
	  
	  
  }
  
  donate(form: NgForm){
	  
	  this.isLoading = true;
	  
	  this.userService.donate(form.value.amount).subscribe( status => this.status = status,
	                error => {this.alert = 'An error occured while donating. Please try again later';this.type = 'failure';this.isLoading = false;},
					() => {
						this.isLoading = false;
						if(this.status==='Success'){
							form.reset();
							this.alert = 'Donated successfully';
							this.type = 'success';
						}else if(this.status==='Failure'){
							form.reset();
							this.alert = 'An error occured while donating. Please try again later';
							this.type = 'failure';
						}
					}
	                 );
	  
  }
  
  toggleMobile(){
	  this.mobileButton = this.mobileButton==='Update'? 'Update Mobile': 'Update';
  }	  
  
  updateMobile(form: NgForm){
	  this.isLoading = true;
	  this.fullUser.mobile = form.value.mobile;
	  this.userService.updateMobile(this.fullUser).subscribe( status => this.status = status,
	                error => {this.mobileButton = 'Update Mobile';this.alert = 'An error occured while updating. Please try again later';this.type = 'failure';this.isLoading = false;},
					() => {
						this.isLoading = false;
						this.mobileButton = 'Update Mobile';
						if(this.status==='Success'){
							form.reset();
							this.alert = 'Mobile updated successfully';
							this.type = 'success';
						}else if(this.status==='Failure'){
							form.reset();
							this.alert = 'An error occured while updating. Please try again later';
							this.type = 'failure';
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
