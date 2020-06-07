import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
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
  form: NgForm = null;
  user: User = null;
  newPassword: string = null;

  constructor(private userService: UserService, private router: Router) {  }

  ngOnInit(): void {
	  this.getUser();
  }
  
  getUser(){
	  this.user = JSON.parse(localStorage.getItem('user'));
  }
  
  onSubmit(form: NgForm) {
	if (!form.valid) {
      return;
    }
    this.form = form;
	this.isLoading = true;
    this.formDisabled = true;
	
	this.newPassword = form.value.retypepassword;
	
	if(form.value.currentpassword !== this.user.password){
		this.isLoading = false;
        this.formDisabled = false;
        this.alert = 'Current password is incorrect. Please enter the correct password';
        this.type = 'failure';
    }else if( this.form.value.password !== this.form.value.retypepassword){
		this.isLoading = false;
        this.formDisabled = false;
		this.alert = 'New passwords does not match';
	    this.type = 'failure';
	}else{  
	
	var user = new User(this.user.username, form.value.retypepassword, 'user');
	
	this.userService.changePassword(user).subscribe(status => this.status = status,
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
	    this.form.reset();
		var user = new User(this.user.username, this.newPassword, this.user.role);
		localStorage.setItem('user', JSON.stringify(user));
	  }
  }

}
