import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FullUser } from '../../model/full-user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  
  @Input() userToBeAdded: FullUser;
  @Output() close = new EventEmitter<void>();
  
  roles = ['Challenger','Motivator'];
  isLoading = false;
  alert: string = null;
  type: string = null;
  status: string = null;
  
  constructor(private userService: UserService) { }

  onClose() {
      this.close.emit();
  }
  
  getBorder(){
	  return '6px solid #ccffcc';
  }
  
  add(){
	   this.isLoading = true;
	   this.userService.addUser(this.userToBeAdded).subscribe(status => this.status = status,
	                    error => {this.alert = 'An error occured while adding the user. Please try again later';this.type = 'failure';this.isLoading = false;},
		   () => {
			   if(this.status === 'Success'){
				   this.isLoading = false;
				   this.alert = 'User added successfully';
				   this.type = 'success';
				   this.userToBeAdded = null;
			   }else if(this.status === 'Failure'){
				   this.isLoading = false;
				   this.alert = 'An error occured while adding the user. Please try again later';
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
