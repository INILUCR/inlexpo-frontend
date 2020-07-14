import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosFilterPipe } from './ver-articulos/articulosFilter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerArticulosComponent } from './ver-articulos/ver-articulos.component';
import { AgregarArticuloComponent } from './agregar-articulo/agregar-articulo.component';



@NgModule({
  declarations: [
    ArticulosFilterPipe,
    VerArticulosComponent,
    AgregarArticuloComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DiccionarioModule { }
