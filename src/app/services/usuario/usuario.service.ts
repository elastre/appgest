import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  token:string;

  constructor(
    public http:HttpClient,
    public router:Router,
    public _subirArchivoService : SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado(){
    return (this.token.length > 5)? true:false
  }

  cargarStorage(){
    if (localStorage.getItem('token')){
      this.token    = localStorage.getItem('token');
      this.usuario  = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token ='';
      this.usuario =null;
    }
  }


  guardarStorage(id:string,token:string,usuario:Usuario){
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    
    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  //login Google
  loginGoogle(token:string){
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url,{token}).pipe(
      map( (resp : any)=>{
        this.guardarStorage(resp.id,resp.token,resp.usuario);        
        return true;
      }));
  }

  //Login Normal
  login(usuario:Usuario, recordar:boolean=false){

    if(recordar){
      localStorage.setItem('email',usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url,usuario).pipe(
      map( (resp : any)=>{
        this.guardarStorage(resp.id,resp.token,resp.usuario);     
        return true;
      }));
  }

  crearUsuario(usuario:Usuario){

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url,usuario).pipe(
      map( (resp : any)=>{
          swal("Usuario Creado!", usuario.email, "success");
          return resp.usuario
      }));

  }

  actualizarUsuario(usuario:Usuario){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    
    return this.http.put(url, usuario).pipe(
      map( (resp : any)=>{
        this.guardarStorage(resp.usuario._id,this.token,resp.usuario);
        swal("Usuario Actualizado!", usuario.nombre, "success");
        return true;
      }));

  }

  cambiarImagen(archivo:File, id:string){
      this._subirArchivoService.subirArchivo(archivo,'usuarios',id)
        .then((resp:any)=>{ 
            console.log(resp);          
            this.usuario.img = resp.usuarioActualizado.img;
            this.guardarStorage(id,this.token,this.usuario);
            swal("Imagen Actualizada!", this.usuario.nombre, "success");
        }).catch(resp=>{
          console.log(resp);
        });
  }

}
