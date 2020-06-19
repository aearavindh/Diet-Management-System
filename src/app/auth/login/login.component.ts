import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'AEA Diet Management System';
  roles = ['Challenger','Motivator','Administrator']
  isLoading = false;
  formDisabled = false;
  alert: string = null;
  type: string = null;
  status: string = null;
  selectedUser = 'Challenger';
  user: User = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm) {
	if (!form.valid) {
      return;
    }

	this.isLoading = true;
    this.formDisabled = true;

    this.user = new User(form.value.email, form.value.password, this.selectedUser);

	this.authService.login(this.user).subscribe(status => this.status = status,
	        error => {this.alert = 'An error occured. Please try again later';this.type = 'failure';this.isLoading = false;
                      this.formDisabled = false;},
		    () => { if(this.status === 'Success') {
			      this.isLoading = false;
                  this.formDisabled = false;
				  this.alert = 'Hiya '+this.selectedUser+'. Welcome back';
			      this.type = 'success';
            }else if(this.status === 'Inappropriate user type'){
				  this.isLoading = false;
                  this.formDisabled = false;
				  this.alert = 'You are not a '+this.selectedUser+'. Please login as appropriate user';
			      this.type = 'info';
			}else if(this.status === 'Not registered'){
                this.isLoading = false;
                this.formDisabled = false;
                this.alert = 'You are not a registered user. Please register as challenger';
                this.type = 'info';
                form.reset();
            }else if(this.status === 'Wrong Password'){
                this.isLoading = false;
                this.formDisabled = false;
                this.alert = 'Password is incorrect . Please enter the correct password';
                this.type = 'failure';
            }
			}
	
	);
    
  }
  
  onHandleAlert(){
    var r = this.type;
    this.alert = null;
    this.type = null;
    if(r === 'success'){
		localStorage.setItem('user', JSON.stringify(this.user));
		sessionStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['user']);
	}
  }

}
