import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  // Toca a vanila JS porque Angular aun no posee la forma

  subirArchivo(archivo:File, tipo: string, id: string){

      return new Promise((resolve, reject)=>{
        let formData = new FormData();
        let xhr = new XMLHttpRequest();
  
        formData.append('iamgen',archivo,archivo.name);
  
        xhr.onreadystatechange = function(){
          if(xhr.readyState === 4){
            if(xhr.status === 200){
              console.log('Imagen cargada.');
              resolve(xhr.response);
            }else{
              console.log('Fallo la subida de la imagen.');
              reject(xhr.response);
            }  
          }  
        };

        let url = URL_SERVICIOS + '/upload' + tipo + '/id';

        xhr.open('PUT',url,true);
        xhr.send(formData);

      });      

  }
}
