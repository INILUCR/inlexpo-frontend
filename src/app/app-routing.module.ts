import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarDiccionarioComponent } from '../features/agregar-diccionario/agregar-diccionario/agregar-diccionario.component';
import { VerArticulosComponent } from 'src/features/diccionario/ver-articulos/ver-articulos.component';


const routes: Routes = [
  { path: 'agregar-diccionario', component: AgregarDiccionarioComponent },
  { path: 'diccionario/:diccionarioId', component: VerArticulosComponent },
  { path: '', redirectTo: 'agregar-diccionario', pathMatch: 'full' },
  { path: '**', component: AgregarDiccionarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
