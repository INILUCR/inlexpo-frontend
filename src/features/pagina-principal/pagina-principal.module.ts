import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { DiccionarioService } from '../../core/services/diccionario.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PaginaPrincipalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    DiccionarioService
  ],
  exports: [
    PaginaPrincipalComponent
  ]
})
export class PaginaPrincipalModule { }
