import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { User } from '../../model/user.model';
import { Post } from '../../model/post.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  message: string = null;
  file: File;
  files: any[];
  posts: Post[];
  table: boolean = false;
  user: User;
  isLoading = false;
  alert: string = null;
  type: string = null;
  status: string = null;
  date: string = null;
  postBatch: string = 'BELOW_BMI_25';

  constructor(private sanitizer: DomSanitizer, private userService: UserService) { }

  ngOnInit(): void {
	  this.isLoading = true;
	  this.user = JSON.parse(localStorage.getItem('user'));
	  if(this.user.role==='Administrator'){
	    this.getDate();
	  }
	  if(this.user.role==='Challenger'){
		this.getPosts();
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
	this.isLoading = false;
  }
  
  getPosts(){
	  this.userService.getPosts().subscribe( posts => this.posts = posts,
					error => {this.isLoading = false;},
					() => {
						   this.files = [];
						   for(var i in this.posts){           
                               this.files.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,'+this.posts[i].file));
						   }
						   if(this.posts.length>0)
			                  this.table = true;
		                   else 
			                  this.table = false;
						   this.isLoading = false;
						  }
	                );
  }
  
  handleFileInput(event) {
    this.file = event.target.files[0];
	if(this.file.size>209716){
		this.alert = 'Please upload file with size less than 200KB';
		this.type = 'info';
    }
}
  
  post(){
	  this.isLoading = true;
	  const formData = new FormData();
      formData.append('plan', this.file, this.file.name);
	  const data = this.date+'/'+this.postBatch+'/'+this.user.username+'/'+this.message;
	  this.userService.sendPost(formData, data).subscribe(status => this.status = status,
	       error => {this.alert = 'An error occured while posting. Please try again later';this.type = 'failure';this.isLoading = false;},
		   () => {
			   if(this.status === 'Success'){
				   this.isLoading = false;
				   this.alert = 'Posted Successfully';
				   this.type = 'success';
			   }
		   }
		   );
  }
  
  onHandleAlert(){
	  this.alert = null;
	  this.type = null;
	  this.status = null; 
  }

}
