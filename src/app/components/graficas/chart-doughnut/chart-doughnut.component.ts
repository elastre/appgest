import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.css']
})
export class ChartDoughnutComponent implements OnInit {

  // Doughnut
  @Input() ChartLabels:string[] = [];
  @Input() ChartData:number[] = [];
  @Input() ChartType:string = '';
   
  constructor() { }

  ngOnInit() {
  }

}
