import { Injectable } from "@angular/core";
import { ArticuloService } from "./articulo.service";
import { AcepcionService } from "./acepcion.service";
import { Articulo } from "../models/articulo";

// Como crear pdfs
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Como agregar fuentes: https://pdfmake.github.io/docs/fonts/custom-fonts-client-side/vfs/
// Nota: Agregar las fuente a assts/fonts
pdfMake.fonts = {
  Courier: {
    normal: "CourierPrime-Regular.ttf",
    bold: "CourierPrime-Bold.ttf",
    italics: "CourierPrime-Italic.ttf",
    bolditalics: "CourierPrime-BoldItalic.ttf",
  },
  Helvetica: {
    normal: "Helvetica.ttf",
    bold: "Helvetica-Bold.ttf",
    italics: "Helvetica-Oblique.ttf",
    bolditalics: "Helvetica-BoldOblique.ttf",
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
  Times: {
    normal: "times new roman.ttf",
    bold: "times new roman bold.ttf",
    italics: "times new roman italic.ttf",
    bolditalics: "times new roman bold italic.ttf",
  },
};

@Injectable({
  providedIn: "root",
})
export class DiccionarioAPdfService {
  articulos: Articulo[];
  conjuntoAcepciones = [];

  constructor(
    private acepcionService: AcepcionService,
    private articuloService: ArticuloService
  ) {}

  public crearPdf(diccionarioId: number, estilos, orden) {
    this.articuloService
      .buscarPorDiccionario(diccionarioId)
      .subscribe((articulos) => {
        this.articulos = articulos;

        let contadorAcepciones = 0;

        for (let i = 0; i < this.articulos.length; ++i) {
          this.acepcionService
            .buscarPorArticulo(articulos[i].id)
            .subscribe((acepciones) => {
              this.conjuntoAcepciones[i] = acepciones;
              ++contadorAcepciones;

              if (contadorAcepciones === this.articulos.length) {
                this.llenarDocumento(estilos, orden);
              }
            });
        }
      });
  }

  private llenarDocumento(estilos, orden) {
    const documentDefinition = { content: [], styles: estilos };

    for (let i = 0; i < this.articulos.length; ++i) {
      documentDefinition.content[i] = { text: [] };
      documentDefinition.content[i].text.push({
        text: this.articulos[i].lema + ":",
        style: "lema",
      });

      // Los espacios van separados de los elementos pues sino estos tambien reciben el estilo
      documentDefinition.content[i].text.push({
        text: " ",
      });

      for (let acepcion of this.conjuntoAcepciones[i]) {
        // Colocamos la prioridad
        documentDefinition.content[i].text.push({
          text: acepcion.prioridad + ".",
          bold: true,
        });

        documentDefinition.content[i].text.push({
          text: " ",
        });

        for (let elemento of orden) {
          if (elemento === "definicion") {
            documentDefinition.content[i].text.push({
              text: acepcion[elemento],
              style: elemento,
            });
          } else {
            documentDefinition.content[i].text.push({
              text: acepcion[elemento].nombre + ".",
              style: elemento,
            });
          }

          documentDefinition.content[i].text.push({
            text: " ",
          });
        }
      }
    }

    pdfMake.createPdf(documentDefinition).open();
  }
}
