import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any = [
    { 
      titulo:'Principal',
      icono:'mdi mdi-gauge',
      submenu:[
        { titulo:'Dasboard',url:'/dashboard'},
        { titulo:'Barras de Progreso',url:'/progress'},
        { titulo:'Graficas',url:'/graficas1'}
      ]
    }
  ];

  constructor() { }
}
