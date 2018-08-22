import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http:HttpClient
  ) {}

  crearUsuario(usuario:Usuario){

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url,usuario).pipe(
      map( (resp : any)=>{
          swal("Usuario Creado!", usuario.email, "success");
          return resp.usuario
      }));

  }

}
