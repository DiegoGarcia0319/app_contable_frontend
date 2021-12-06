import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms'; // importar libreria
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Mae } from 'src/models/mae.models'; // importar libreria
import { MaeService } from '../services/mae.service'; // importar clase definida para los servicios

@Component({
  selector: 'create-mae',
  templateUrl: './create-mae.component.html',
  styleUrls: ['./create-mae.component.css']
})
export class CreateMaeComponent implements OnInit {

  content: string = "Hola mundo";
  texto: string = "";

  errorMessage = 'Este campo es requerido.';
  private isEditing = false;
  private maeId!: string;

  constructor(public maeService: MaeService,  public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('maeId')) {
        this.isEditing = true;
        this.maeId = paramMap.get('maeId')!;
      } else {
        this.isEditing = false;
      }
    });
  }

  showText(){
    this.content = this.texto; // this. por ser variable de la misma class CreatePostComponent
  }

  addMae(form: NgForm){
    if(form.valid){
      this.maeService.addMae(form.value);
      form.resetForm(); // metodo para limpiar el formulario
    }
  }

  getErrorMessage(){
    return this.errorMessage;
  }

}
