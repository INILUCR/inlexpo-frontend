import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaPrincipalComponent } from '../features/pagina-principal/pagina-principal/pagina-principal.component';
import { AgregarDiccionarioComponent } from '../features/agregar-diccionario/agregar-diccionario/agregar-diccionario.component';
import { FormDiccionarioComponent } from '../features/agregar-diccionario/form-diccionario/form-diccionario.component';
import { AsociarCategoriasDiccionarioComponent } from '../features/agregar-diccionario/asociar-categorias-diccionario/asociar-categorias-diccionario.component';


const routes: Routes = [
  { path: 'pagina-principal', component: PaginaPrincipalComponent },
  { path: 'agregar-diccionario',
    component: AgregarDiccionarioComponent,
    children: [
      { path: 'form-diccionario', component: FormDiccionarioComponent },
      { path: 'asociar-categorias-diccionario', component: AsociarCategoriasDiccionarioComponent },
      { path: '', redirectTo: 'form-diccionario', pathMatch: 'full'}
    ]
  },
  { path: '', redirectTo: 'pagina-principal', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
