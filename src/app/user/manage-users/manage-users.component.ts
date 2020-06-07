import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { FullUser } from '../../model/full-user.model';
import { Batch } from '../../model/batch.model';
import { Group } from '../../model/group.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
	
	users: FullUser[] = [];
	filteredUsers: FullUser[];
	userToBeAdded: FullUser = null;
	userToBeModified: FullUser = null;
	user: User;
	isLoading = false;
    alert: string = null;
    type: string = null;
	status: string = null;
	search = ['Username','Name','Group','Batch'];
	selectedSearch = 'Username';
	selectedGroup: string;
	selectedBatch = 'BELOW_BMI_25';
	name: string;
	username: string;
	batches = ['BELOW_BMI_25','ABOVE_BMI_25'];
	groups1: Group[];
	groups2: Group[];
	addBatch = 'BELOW_BMI_25';
	addGroup: string;
	table: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
	  this.isLoading = true;
	  this.getDetails();
	  this.isLoading = false;
  }
  
  getDetails(){
	  this.user = JSON.parse(localStorage.getItem('user'));
      if(this.user.role !== 'Administrator')
		  this.router.navigate(['../','home'], {relativeTo: this.route});
	  
	  this.userService.getGroups().subscribe( requests =>  {
		                this.groups1 = [];
	                    this.groups2 = [];
						for(var i in requests){
		                    if(requests[i].batch.id===101)
			                    this.groups1.push(requests[i]);
		                    else if(requests[i].batch.id===102)
			                    this.groups2.push(requests[i]);
	                    } 
					},
					error => {this.isLoading = false;},
					() => {
					this.userService.fetchUsers().subscribe(users => this.users = users);
					}
	                );
  } 
  
  deleteUser(fullUser: FullUser){
      this.isLoading = true;
	  this.userService.deleteUser(fullUser.email).subscribe(status => this.status = status,
	       error => {this.alert = 'An error occured while deleting the user. Please try again later';this.type = 'failure';this.isLoading = false;this.getDetails();this.searchUser();},
		   () => {
			   if(this.status === 'Success'){
				   this.isLoading = false;
				   this.alert = 'User deleted successfully';
				   this.type = 'success';
				   this.getDetails();
				   this.searchUser();
			   }
		   }
		   );
  }
  
  searchUser(){
	  if(this.selectedSearch==='Username'){
		  this.filteredUsers = this.users.filter(user => this.username === user.email);
	  }else if(this.selectedSearch==='Name'){
		  this.filteredUsers = this.users.filter(user => this.name === user.name);
	  }else if(this.selectedSearch==='Group'){
		  this.filteredUsers = this.users.filter(user => this.selectedBatch === user.batchName && this.selectedGroup === user.groupName);
	  }else if(this.selectedSearch==='Batch'){
		  this.filteredUsers = this.users.filter(user => this.selectedBatch === user.batchName);
	  }
	  if(this.filteredUsers.length===0)
		  this.table = false;
	  else 
		  this.table = true;
  }
  
  addUser(){
	 this.userToBeAdded = new FullUser('','','',this.addGroup,this.addBatch,'','','');
  }
  
  modify(fullUser: FullUser){
	  this.userToBeModified = fullUser;
  }
  
  onHandleAlert(){
	  this.alert = null;
	  this.type = null;
	  this.status = null;
	  this.userToBeAdded = null;
	  this.userToBeModified = null;
	  this.getDetails();
	  this.searchUser();
  }

}
