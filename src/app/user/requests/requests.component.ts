import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../../model/user.model';
import { Challenger } from '../../model/challenger.model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
	
	user: User = null;
	challengers: Challenger[];
	
	challenger: Challenger = null;
    isLoading = false;
    alert: string = null;
    type: string = null;
	status: string = null;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {  }

  ngOnInit(): void {
	  this.isLoading = true;
	  this.getUser();
	  this.getRequests();
  }
  
  getRequests(){
	  this.userService.getRequests(this.user.username).subscribe( requests => this.challengers = requests,
	            error => {this.alert = 'An error occured while fetching the requests';this.type = 'failure';this.isLoading = false;},
	            () => { this.isLoading = false; }
	             );
  }
  
  getUser(){
	  this.user = JSON.parse(localStorage.getItem('user'));
      if(this.user.role !== 'Administrator')
		  this.router.navigate(['../','home'], {relativeTo: this.route});
  }
  
  onHandleAlert(){
    this.alert = null;
    this.type = null;
	this.isLoading = false;
	}
  send(challenger: Challenger, status: string){
	  this.isLoading = true;
	  this.userService.updateStatus(challenger, status).subscribe( status => this.status = status,
	  error => {this.alert = 'An error occured. Please try again later';this.type = 'failure';this.isLoading=false;},
	  () => { 
	           this.getRequests();
	           if(this.status === 'Success'){
	             this.isLoading = false;
				 if(status === 'accepted')
					 this.alert = 'Challenger approved successfully';
				 else 
					 this.alert = 'Challenger rejected successfully';
				 this.type = 'success';
	          }else if(this.status === 'Failure'){
				  this.alert = 'An error occured. Please try again later';
				  this.type = 'failure';
              }				  
			}
	  );
  }
  
  fullDetails(challenger: Challenger){
	this.challenger = challenger;
  }	  
  onHandleChallenger(){
	this.challenger = null;
	this.isLoading = false;
  }
}
