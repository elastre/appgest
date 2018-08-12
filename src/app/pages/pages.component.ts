import { Component, OnInit } from '@angular/core';

declare function init_Plugins(); // 1))

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_Plugins(); // 1)) Se llama la inicializacion de los plugin del custon.min.js 
  }

}
