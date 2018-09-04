import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

declare var swal:any; // esto es para evitar error al compilar, pues TS todavia no reconoce bien a swal

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService : UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){

    this.cargando = true;

    this._usuarioService.CargarUsuarios(this.desde)
      .subscribe((resp: any) =>{    
        this.totalRegistros = resp.total;
        this.usuarios       = resp.usuarios;
        this.cargando       = false;
      });
  }

  cambiarDesde( valor:number ){
    let desde = this.desde + valor;    

    if ( desde >= this.totalRegistros){
      return;
    }

    if( desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuarios(termino: string){

    if (termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[])=>{
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario:Usuario){
    if (usuario._id === this._usuarioService.usuario._id){
      swal('No se puede borrar usuario','No se puede borrar a si mismo','error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode:true,
    })
    .then(borrar =>{

      if (borrar){
        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe(resp=>{
          this.cargarUsuarios();
        });
      }

    })
  }

  guardarUsuario(usuario:Usuario){

    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();

  }

}
