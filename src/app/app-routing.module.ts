import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarDiccionarioComponent } from '../features/agregar-diccionario/agregar-diccionario/agregar-diccionario.component';
import { VerArticulosComponent } from 'src/features/diccionario/ver-articulos/ver-articulos.component';
import { AgregarArticuloComponent } from 'src/features/diccionario/agregar-articulo/agregar-articulo.component';
import { PaginaPrincipalComponent } from 'src/features/pagina-principal/pagina-principal/pagina-principal.component';



const routes: Routes = [
  { path: 'inicio', component: PaginaPrincipalComponent },
  { path: 'agregar-diccionario', component: AgregarDiccionarioComponent },
  { path: 'diccionario/:diccionarioId', component: VerArticulosComponent },
  { path: 'diccionario/:diccionarioId/agregar-articulo', component: AgregarArticuloComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', component: PaginaPrincipalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
