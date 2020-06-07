import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService, ResponseData } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  title = 'Forgot Password';
  
  isLoading = false;
  formDisabled = false;
  codeFormDisabled = false;
  alert: string = null;
  type: string = null;
  codeResponse: ResponseData = null;
  codeSuccess: boolean = false;
  codeSent:boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm) {
	if (!form.valid) {
      return;
    }
	
	this.isLoading = true;
    this.formDisabled = true;
    this.codeFormDisabled = true;
	this.authService.forgotPassword(form.value.email).subscribe(response => this.codeResponse = response,
	        error => {this.alert = 'An error occured. Please try again later';this.type = 'failure';this.isLoading = false;
                      this.formDisabled = false;this.codeFormDisabled = false;},
		    () => { if(this.codeResponse.message === 'Success') {
			      this.isLoading = false;
                  this.formDisabled = false;
                  this.codeFormDisabled = false;
				  this.alert = 'Please enter the OTP sent to your email';
                  this.type = 'success';
                  this.codeSent = true;
                  localStorage.setItem('email', form.value.email);
            }else if(this.codeResponse.message === 'Not registered'){
                this.isLoading = false;
                this.formDisabled = false;
                this.codeFormDisabled = false;
                this.alert = 'You are not a registered user. Please register as challenger';
                this.type = 'info';
            }
			}
	
	);
    
  }

  onSubmitCode(form: NgForm) {
	if (!form.valid) {
      return;
    }
    
	this.isLoading = true;
    this.formDisabled = true;
    this.codeFormDisabled = true;

    if(this.codeResponse.code == form.value.code){
		this.codeSuccess = true;
        this.isLoading = false;
        this.formDisabled = false;
        this.codeFormDisabled = false;
        this.alert = 'OTP verified successfully';
        this.type = 'success';
    }else{
        this.isLoading = false;
        this.formDisabled = false;
        this.codeFormDisabled = false;
        this.alert = 'OTP is incorrect. Please enter the correct OTP';
        this.type = 'failure';
    }

    
  }
  
  onHandleAlert(){
      var r = this.type;
	  this.alert = null;
      this.type = null;
      if(this.codeSuccess)
        this.router.navigate(['../','change-password'], {relativeTo: this.route});
      if(r === 'info')
        this.router.navigate(['']);	  
  }
}
