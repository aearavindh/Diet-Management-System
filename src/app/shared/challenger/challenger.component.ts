import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Challenger } from '../../model/challenger.model';

@Component({
  selector: 'app-challenger',
  templateUrl: './challenger.component.html',
  styleUrls: ['./challenger.component.css']
})
export class ChallengerComponent {
  @Input() challenger : Challenger;
  @Output() close = new EventEmitter<void>();
  
  
  
  onClose() {
    this.close.emit();
  }
  
  getBorder(){
	  return '6px solid #ccffcc';
  }
  getColor(){
      return '#006622';
  }	   
}


