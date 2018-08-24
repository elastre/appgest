import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_Plugins();

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  recuerdame:boolean = false;
  auth2 : any;

  constructor(public router:Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_Plugins(); // se llama la inicializacion de los plugin del custon.min.js 
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 0){
      this.recuerdame=true;
    }
  }

  //INICIALIZACION PLUGINS DE GOOGLE
  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '831939222047-6hi1enj1vjrf3tflegfovnbgbvcki0j6.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope:'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
    
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element,{}, (googleUser)=>{
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
      .subscribe(resp=> window.location.href = '#/dashboard');      
    });
  }

  ingresar(forma: NgForm){
    
    if (forma.invalid){
      return;
    }

    let usuario = new Usuario(null,forma.value.email,forma.value.password);

    this._usuarioService.login(usuario,forma.value.recuerdame)
      .subscribe(resp=>this.router.navigate(['/dashboard']));

  }
}
