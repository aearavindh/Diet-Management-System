import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FullUser } from '../../model/full-user.model';
import { UserService } from '../user.service';
import { Group } from '../../model/group.model';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent {
	
  @Input() userToBeModified: FullUser;
  @Output() close = new EventEmitter<void>();
  
  roles = ['Challenger','Motivator'];
  batches = ['BELOW_BMI_25','ABOVE_BMI_25'];
  
  isLoading = false;
  alert: string = null;
  type: string = null;
  status: string = null;
  
  groups1: Group[];
  groups2: Group[];

  constructor(private userService: UserService) { 
                        this.isLoading = true;
                        this.getDetails(); 
						}

  onClose() {
      this.close.emit();
  }
  
  getDetails(){
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
					this.isLoading = false;
					}
	                );
  }
  
  getBorder(){
	  return '6px solid #ccffcc';
  }
  
  modify(){
	   this.isLoading = true;
	   this.userService.modifyUser(this.userToBeModified).subscribe(status => this.status = status,
	                    error => {this.alert = 'An error occured while modifying the user. Please try again later';this.type = 'failure';this.isLoading = false;},
		   () => {
			   if(this.status === 'Success'){
				   this.isLoading = false;
				   this.alert = 'User modified successfully';
				   this.type = 'success';
				   this.onClose();
			   }else if(this.status === 'Failure'){
				   this.isLoading = false;
				   this.alert = 'An error occured while modifying the user. Please try again later';
				   this.type = 'failure';
			   }
		   }
		   );
  }

  onHandleAlert(){
	  this.alert = null;
	  this.type = null;
  }	  

}
