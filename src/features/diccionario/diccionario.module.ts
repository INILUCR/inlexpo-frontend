import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosFilterPipe } from './ver-articulos/articulosFilter';
import { FormsModule } from '@angular/forms';
import { VerArticulosComponent } from './ver-articulos/ver-articulos.component';



@NgModule({
  declarations: [
    ArticulosFilterPipe,
    VerArticulosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class DiccionarioModule { }
