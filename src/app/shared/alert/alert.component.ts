import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string;
  @Input() type: string;
  @Output() close = new EventEmitter<void>();
  
  onClose() {
    this.close.emit();
  }
  
  getColor(){
	  if(this.type === 'success')
		  return '#006622';
	  else if(this.type === 'failure')
		  return 'red';
	  else if(this.type === 'info')
		  return 'blue';
  }
  getBorderColor(){
	  if(this.type === 'success')
		  return '6px solid #ccffcc';
	  else if(this.type === 'failure')
		  return '6px solid #ffd6cc';
	  else if(this.type === 'info')
		  return '6px solid #b3d1ff';
  }
}
