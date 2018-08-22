import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert'; //import * as swal from 'sweetalert'; esta forma tambien funciona :)
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_Plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    init_Plugins();
    
    this.forma = new FormGroup({
      nombre      : new FormControl(null, Validators.required), //-->(valor por defecto, validaciones)
      email       : new FormControl(null,[Validators.required,Validators.email]),
      password    : new FormControl(null, Validators.required),
      password2   : new FormControl(null, Validators.required),
      condiciones : new FormControl(false)
    },{validators: this.ValidarContraseñas('password','password2') });
  }

  registrarUsuario(){

    if (this.forma.invalid){
      return;
    }

    if (!this.forma.value.condiciones){
      swal("Importante!", "Debe aceptar las condiciones!", "warning");
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp=>this.router.navigate(['/login']));

  }

  ValidarContraseñas(campo1:string,campo2:string){

    return (group:FormGroup)=>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 == pass2){
        return null
      }

      return {
        sonIguales: true
      }

    }
  }

}
