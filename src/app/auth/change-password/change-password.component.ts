import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  
  title = 'Change Password';
  
  isLoading = false;
  formDisabled = false;
  alert: string = null;
  type: string = null;
  status: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm) {
	if (!form.valid) {
      return;
    }
    
	this.isLoading = true;
    this.formDisabled = true;
	
	if( form.value.password !== form.value.retypepassword){
		this.isLoading = false;
        this.formDisabled = false;
		this.alert = 'Passwords does not match';
	    this.type = 'failure';
	}else{
	
	
	
	var user = new User(localStorage.getItem('email'), form.value.retypepassword, 'user');
	
	this.authService.changePassword(user).subscribe(status => this.status = status,
	        error => {this.alert = 'An error occured. Please try again later';this.type = 'failure';this.isLoading = false;
                      this.formDisabled = false;},
		    () => { if(this.status === 'Success') {
			      this.isLoading = false;
                  this.formDisabled = false;
				  this.alert = 'Password changed successfully';
			      this.type = 'success';
            }else if(this.status === 'Failure'){
				  this.isLoading = false;
                  this.formDisabled = false;
				  this.alert = 'Cound not change the password. Please try again later';
			      this.type = 'failure';
			}
			}
	
	);
	}
  }
  
  onHandleAlert(){
	  var r = this.type;
	  this.alert = null;
	  this.type = null;
	  if(r === 'success'){
	    localStorage.clear();
	    this.router.navigate(['']);
	  }
  }
}
