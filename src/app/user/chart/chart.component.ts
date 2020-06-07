import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
	
  @Input() attribute: string;
  @Input() label: string[];
  @Input() data: number[];
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
	  
  var myChart = new Chart("myChart", {
    type: 'bar',
    data: {
        labels: this.label,
        datasets: [{
            label: this.attribute,
            data: this.data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
	  
  }
  
  onClose() {
      this.close.emit();
  }
  
  getBorder(){
	  return '6px solid #ccffcc';
  }

}
