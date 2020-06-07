import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  user: User = null;
  big: boolean = true;
  
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
   if(window.innerWidth<992)
	   this.big = false;
   else 
	   this.big = true;
  }

  constructor(private router: Router, private route: ActivatedRoute) { this.user = JSON.parse(localStorage.getItem('user')); }

  ngOnInit(): void {
	  if(window.innerWidth<992)
		  this.big = false;
  }

  goHome(){
	  this.router.navigate(['home'], {relativeTo: this.route});
  }
  onLogout(){
	  localStorage.clear();
	  sessionStorage.clear();
	  this.router.navigate(['auth']);
  }

}
