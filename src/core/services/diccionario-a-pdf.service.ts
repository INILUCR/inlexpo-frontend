import { Injectable } from '@angular/core';
import { ArticuloService } from './articulo.service';
import { AcepcionService } from './acepcion.service';
import { Articulo } from '../models/articulo';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { empty } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class DiccionarioAPdfService {

  articulos: Articulo[];
  conjuntoAcepciones = [];

  constructor(private acepcionService: AcepcionService,
              private articuloService: ArticuloService) {}

  public crearPdf(diccionarioId: number, estilos) {
    this.articuloService.buscarPorDiccionario(diccionarioId).subscribe(articulos => {
      this.articulos = articulos;

      let contadorAcepciones = 0;

      for (let i = 0; i < this.articulos.length; ++i) {
        this.acepcionService.buscarPorArticulo(articulos[i].id).subscribe(acepciones => {
          this.conjuntoAcepciones[i] = acepciones;
          ++contadorAcepciones;

          if (contadorAcepciones === this.articulos.length) {
            this.llenarDocumento();
          }
        });
      }
    });
  }

  private llenarDocumento() {
    const documentDefinition = { content: [] };

    for (let i = 0; i < this.articulos.length; ++i) {
      documentDefinition.content[i] = { text: [] };
      documentDefinition.content[i].text.push({text: this.articulos[i].lema + ': '});


      for (let acepcion of this.conjuntoAcepciones[i]) {
        documentDefinition.content[i].text.push({text: acepcion.prioridad + ' '});
        documentDefinition.content[i].text.push({text: acepcion.catGramatical.abreviatura + ' '});
        documentDefinition.content[i].text.push({text: acepcion.definicion + ' '});
      }
    }

    pdfMake.createPdf(documentDefinition).open();
  }
}
