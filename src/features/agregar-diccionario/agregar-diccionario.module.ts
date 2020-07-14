import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarDiccionarioComponent } from './agregar-diccionario/agregar-diccionario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatGramaticalService } from '../../core/services/cat-gramatical.service';
import { AppRoutingModule } from '../../app/app-routing.module';


@NgModule({
  declarations: [
    AgregarDiccionarioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    CatGramaticalService
  ],
  exports: [
    AgregarDiccionarioComponent
  ]
})
export class AgregarDiccionarioModule { }
