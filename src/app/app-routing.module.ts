import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarDiccionarioComponent } from '../features/agregar-diccionario/agregar-diccionario/agregar-diccionario.component';


const routes: Routes = [
  { path: 'agregar-diccionario', component: AgregarDiccionarioComponent },
  { path: '', redirectTo: 'agregar-diccionario', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
