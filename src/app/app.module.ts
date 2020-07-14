import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgregarDiccionarioModule } from '../features/agregar-diccionario/agregar-diccionario.module';
import { DiccionarioModule } from 'src/features/diccionario/diccionario.module';
import { PaginaPrincipalModule } from 'src/features/pagina-principal/pagina-principal.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginaPrincipalModule,
    AgregarDiccionarioModule,
    DiccionarioModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
