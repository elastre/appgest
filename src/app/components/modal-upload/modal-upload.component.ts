import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  //usuario : Usuario;
  imagenSubir : File;
  imagenTemp : string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService : ModalUploadService
  ) {}

  ngOnInit() {
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImage(archivo:File){

    if (!archivo){
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0){
        this.imagenSubir = null;
        swal('Solo imágenes','El archivo seleccionado no es una imagen','error');
        return;
    }
   
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = ()=>this.imagenTemp = reader.result;

  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir,this._modalUploadService.tipo,this._modalUploadService.id)
      .then(resp=>{
        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      }).catch(err=>{
        console.log("Error en la cargar");
      });
  }


}
