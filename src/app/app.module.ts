import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginaPrincipalModule } from '../features/pagina-principal/pagina-principal.module';
import { AgregarDiccionarioModule } from '../features/agregar-diccionario/agregar-diccionario.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginaPrincipalModule,
    AgregarDiccionarioModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
