import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { FullUser } from '../../model/full-user.model';
import { Batch } from '../../model/batch.model';
import { Group } from '../../model/group.model';
import { User } from '../../model/user.model';
import { Message } from '../../model/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
	
  messages: Message[];
  fullUser: FullUser;
  message: string = null;
  username: string = null;
  user: User;
  isLoading = false;
  alert: string = null;
  type: string = null;
  status: string = null;
  date: string = null;
  table: boolean = false;
  selectedSend: string = null;
  send: string[] = [];
  batches = ['BELOW_BMI_25','ABOVE_BMI_25'];
  groups1: Group[];
  groups2: Group[];
  sendBatch: string;
  sendGroup: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
	  this.isLoading = true;
	  this.user = JSON.parse(localStorage.getItem('user'));
	    this.getDate();
		this.getDetails();
		this.getMessages();
  }
  
  getDetails(){
	  if(this.user.role==='Challenger'){
		  this.send = ['Motivator'];
		  this.selectedSend = 'Motivator';
	  }else if(this.user.role==='Administrator'){
		  this.send = ['Particular User','Motivators','Challengers'];
		  this.selectedSend = 'Particular User';
	  }
	  else if(this.user.role==='Motivator'){
		  this.send = ['Challenger','Group','Batch','Administrators'];
		  this.selectedSend = 'Challenger';
		  
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
						this.userService.fetchUser().subscribe( user => this.fullUser = user,
						     error => {this.isLoading = false},
							 () => {
								 this.sendBatch = this.fullUser.batchName;
							 });
					}
	                );
	  }
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
  
  getMessages(){
	  this.userService.getMessages().subscribe( messages => this.messages = messages,
					error => {this.isLoading = false;},
					() => {this.isLoading = false;
					       if(this.messages.length>0)
			                  this.table = true;
		                   else 
			                  this.table = false;}
	                );
  }
  
  sendMessage(){
	  
	  this.isLoading = true;
	  
	  if(this.selectedSend==='Particular User' || this.selectedSend==='Challenger' || this.selectedSend==='Motivator'){
		  
		  let m = new Message(this.date, this.username, this.user.username, this.message);
		  
		  this.userService.sendMessageToUser(m).subscribe(status => this.status = status,
	       error => {this.alert = 'An error occured while sending the message. Please try again later';this.type = 'failure';this.isLoading = false;},
		   () => {
			   if(this.status === 'Success'){
				   this.isLoading = false;
				   this.alert = 'Message sent successfully';
				   this.type = 'success';
			   }
			   if(this.status === 'Invalid user'){
				   this.isLoading = false;
				   this.alert = 'Invalid username. Please enter correct username';
				   this.type = 'failure';
			   }
		   }
		   );
		 
	  }else if(this.selectedSend==='Motivators' || this.selectedSend==='Challengers' || this.selectedSend==='Administrators' || this.selectedSend==='Batch'){
		  let to = null;
		  if(this.selectedSend==='Batch')
			  to = this.sendBatch;
		  else
			  to = this.selectedSend;
			  
		  let m = new Message(this.date, to, this.user.username, this.message);
		  
		  this.userService.sendMessageToBatch(m).subscribe(status => this.status = status,
	       error => {this.alert = 'An error occured while sending the message. Please try again later';this.type = 'failure';this.isLoading = false;},
		   () => {
			   if(this.status === 'Success'){
				   this.isLoading = false;
				   this.alert = 'Message sent successfully';
				   this.type = 'success';
			   }
		   }
		   );
		 
	  }else if(this.selectedSend==='Group'){
		  
		  let m = new Message(this.date, this.sendGroup, this.user.username, this.message);
		  
		  this.userService.sendMessageToGroup(m, this.sendBatch).subscribe(status => this.status = status,
	       error => {this.alert = 'An error occured while sending the message. Please try again later';this.type = 'failure';this.isLoading = false;},
		   () => {
			   if(this.status === 'Success'){
				   this.isLoading = false;
				   this.alert = 'Message sent successfully';
				   this.type = 'success';
			   }
		   }
		   );
		 
	  }
  }
  
  onHandleAlert(){
	  this.alert = null;
	  this.type = null;
	  this.status = null; 
  }

}
