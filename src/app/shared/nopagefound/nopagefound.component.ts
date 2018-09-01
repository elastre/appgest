import { Component, OnInit } from '@angular/core';

declare function init_Plugins(); // 1))

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_Plugins(); // 1)) Se llama la inicializacion de los plugin del custon.min.js 
  }

}
