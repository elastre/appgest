import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string='usuario'): any {

    let url = URL_SERVICIOS + '/img';
    
    if(!img){
      return url+='/usuarios/noimage'; // para que no traiga ninguna imagen noimage=PALABRA CUALQUIERA
    }

    if (img.lastIndexOf('https') >= 0){
      return img;
    }

    switch (tipo){
      case 'usuario':
        url += '/usuarios/'+ img;
        break;
      case 'proyecto':
        url += '/usuarios/'+ img;
        break;     
      case 'tercero':
        url += '/usuarios/'+ img;
        break;  
      default:
        url += '/usuarios/noimage';
    }
    
    return url;
  }

}
