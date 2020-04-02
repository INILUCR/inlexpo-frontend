import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDiccionarioComponent } from './form-diccionario/form-diccionario.component';
import { AgregarDiccionarioComponent } from './agregar-diccionario/agregar-diccionario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AsociarCategoriasDiccionarioComponent } from './asociar-categorias-diccionario/asociar-categorias-diccionario.component';
import { CatGramaticalService } from '../../core/services/cat-gramatical.service';



@NgModule({
  declarations: [
    AgregarDiccionarioComponent,
    FormDiccionarioComponent,
    AsociarCategoriasDiccionarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    CatGramaticalService
  ],
  exports: [
    AgregarDiccionarioComponent
  ]
})
export class AgregarDiccionarioModule { }
