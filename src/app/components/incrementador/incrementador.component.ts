import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles:[]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;

  @Input('titulo') leyenda: string = "Leyenda 1";
  @Input() progreso: number =50; 

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChanges(newValue:number){

    if (newValue >=100)   { this.progreso = 100 }
    else if(newValue <= 0){ this.progreso = 0 }
    else                  { this.progreso= newValue };

    this.txtProgreso.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  CambiarValor(valor:number){
    if (this.progreso <=0 && valor < 0) {
      this.progreso=0; 
      return;
    }
    if (this.progreso >=100 && valor > 0) {
      this.progreso=100; 
      return;
    }

    this.progreso = this.progreso + valor;

    this.cambioValor.emit(this.progreso);
    this.txtProgreso.nativeElement.focus();
  }

}
