import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { Challenger } from '../../model/challenger.model';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Registration';
  
  cities = ['Chennai','Bangalore','Kochi','Hydrabad','Pune'];
  states = ['Tamil Nadu','Karnataka','Kerala','Telangana','Maharastra'];
  heightVar = null;
  weightVar = null;
  bmiVar = null; 
  gender: string = null;
  screenHeight = null;
  screenWidth = null;
  program: string = null;
  isLoading = false;
  formDisabled = false;
  alert: string = null;
  type: string = null;
  s: string = null;
  
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
   this.screenHeight = window.innerHeight;
   this.screenWidth = window.innerWidth;
  }
  
  constructor(private authService: AuthService, private router: Router) { this.onResize(),this.getProgram()}

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm) {
	if (!form.valid) {
      return;
    }
	this.isLoading = true;
	this.formDisabled = true;
	this.bmi();
	var challenger = new Challenger(this.program, form.value.name, form.value.age, this.gender, form.value.mobile,
	form.value.email, form.value.address, form.value.city, form.value.state, form.value.country, form.value.pincode,
	form.value.height, form.value.weight, String(this.bmiVar), form.value.reason, form.value.con, form.value.res,
    form.value.custom, form.value.referral, form.value.preg, 'Pending');
	
	this.authService.register(challenger).subscribe(status => this.s = status,
	  error => {this.alert = 'An error occured. Please try again later';this.type = 'failure';this.isLoading = false;
      this.formDisabled = false;},
	  () => { if(this.s === 'Created') {
			this.alert = 'Registration successful. Please wait for admin approval.';
			this.type = 'success';
			this.isLoading = false;
            this.formDisabled = false;
            }}
	  );
	
  }
  onHandleAlert(){
	  var r = this.type;
	  this.alert = null;
	  this.type = null;
	  if(r === 'success')
		  this.router.navigate([""]);
  }
  getHeight(){
	if(this.screenWidth<992)
		return '192%';
	else
		return '88%';
  }
  getTop(){
	  if(this.screenWidth<992)
		return '105%';
	else
		return '53%';
  }
  bmi(){
	this.bmiVar = this.weightVar/(this.heightVar*this.heightVar/10000);
  }
  status(){
	 return this.bmiVar===null? 'Click here to know your BMI': this.bmiVar;
  }
  
  getProgram(){
	  var q = ['Q4(Jan-Mar)','Q1(Apr-Jun)','Q2(Jul-Sep)','Q3(Oct-Dec)'];
	  this.program = q[Math.floor(new Date().getMonth() / 3)];
  }
 
}
