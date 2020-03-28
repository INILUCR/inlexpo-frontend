import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiccionarioComponent } from './diccionario/diccionario.component';
import { ResumenDiccionarioComponent } from './resumen-diccionario/resumen-diccionario.component';
import { DiccionarioService } from '../../core/services/diccionario.service';
import { ListaDiccionariosComponent } from './lista-diccionarios/lista-diccionarios.component';
import { BotonComponent } from '../../shared/boton/boton.component';
import { AgregarDiccionarioComponent } from './agregar-diccionario/agregar-diccionario.component';



@NgModule({
  declarations: [
    DiccionarioComponent,
    ResumenDiccionarioComponent,
    ListaDiccionariosComponent,
    BotonComponent,
    AgregarDiccionarioComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ListaDiccionariosComponent
  ],
  providers: [
    DiccionarioService
  ]
})
export class DiccionariosModule { }
