import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  ProgresoAzul: number =30; 
  ProgresoVerde: number =45; 
  
  constructor() { }

  ngOnInit() {
  }
  
  actualizarAzul(event:number){this.ProgresoAzul=event;}
  actualizarVerde(event:number){this.ProgresoVerde=event;}
  
}
