import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosFilterPipe } from './ver-articulos/articulosFilter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerArticulosComponent } from './ver-articulos/ver-articulos.component';
import { AgregarArticuloComponent } from './agregar-articulo/agregar-articulo.component';
import { ExportarDiccionarioComponent } from './exportar-diccionario/exportar-diccionario.component';
import { EditarArticuloComponent } from './editar-articulo/editar-articulo.component';



@NgModule({
  declarations: [
    ArticulosFilterPipe,
    VerArticulosComponent,
    AgregarArticuloComponent,
    ExportarDiccionarioComponent,
    EditarArticuloComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DiccionarioModule { }
