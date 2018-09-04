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

  oculto : string = '';

  //usuario : Usuario;
  imagenSubir : File;
  imagenTemp : string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _ModalUploadService : ModalUploadService
  ) {}

  ngOnInit() {
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

  }


}
