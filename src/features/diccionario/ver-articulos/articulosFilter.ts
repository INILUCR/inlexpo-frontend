import { Pipe, PipeTransform } from "@angular/core";
import { Articulo } from "src/core/models/articulo";

@Pipe({ name: "articulosPipe" })
export class ArticulosFilterPipe implements PipeTransform {
  transform(
    articulos: Articulo[],
    inicio: string,
    inicioYO: string,
    contiene: string,
    contieneYO: string,
    termina: string,
    terminaYO: string
  ): Articulo[] {
    if (!articulos) {
      return [];
    }

    if (inicio || contiene || termina) {
      let articulosFiltrados = [];
      let articulosFiltradosPorO = [];
      let articulosFiltradosPorY = [];

      // La lista de articulos Y empiza llena y se va reduciendo
      if (
        (inicio && inicioYO === "y") ||
        (contiene && contieneYO === "y") ||
        (termina && terminaYO === "y")
      ) {
        articulosFiltradosPorY = articulos;
      }
      // La de O empieza vacia y se va llenando

      // Filtramos por el inicio
      if (inicio) {
        if (inicioYO === "y") {
          articulosFiltradosPorY = articulosFiltradosPorY.filter((articulo) => {
            return articulo.lema.toLocaleLowerCase().startsWith(inicio);
          });
        } else {
          const articuloasAConcatenar = articulos.filter((articulo) => {
            return (
              articulo.lema.toLocaleLowerCase().startsWith(inicio) &&
              !articulosFiltradosPorO.includes(articulo)
            );
          });
          articulosFiltradosPorO = articulosFiltradosPorO.concat(
            articuloasAConcatenar
          );
        }
      }

      // Filtramos por lo que tiene en medio
      if (contiene) {
        if (contieneYO === "y") {
          articulosFiltradosPorY = articulosFiltradosPorY.filter((articulo) => {
            return articulo.lema.toLocaleLowerCase().includes(contiene);
          });
        } else {
          const articuloasAConcatenar = articulos.filter((articulo) => {
            return (
              articulo.lema.toLocaleLowerCase().includes(contiene) &&
              !articulosFiltradosPorO.includes(articulo)
            );
          });
          articulosFiltradosPorO = articulosFiltradosPorO.concat(
            articuloasAConcatenar
          );
        }
      }

      // Filtramos por el final
      if (termina) {
        if (terminaYO === "y") {
          articulosFiltradosPorY = articulosFiltradosPorY.filter((articulo) => {
            return articulo.lema.toLocaleLowerCase().endsWith(termina);
          });
        } else {
          const articuloasAConcatenar = articulos.filter((articulo) => {
            return (
              articulo.lema.toLocaleLowerCase().includes(termina) &&
              !articulosFiltradosPorO.includes(articulo)
            );
          });
          articulosFiltradosPorO = articulosFiltradosPorO.concat(
            articuloasAConcatenar
          );
        }
      }

      if (
        articulosFiltradosPorY.length > 0 ||
        articulosFiltradosPorO.length > 0
      ) {
        articulosFiltrados = articulosFiltradosPorY;
        articulosFiltrados = articulosFiltrados.concat(
          articulosFiltradosPorO.filter((articulo) => {
            return !articulosFiltrados.includes(articulo);
          })
        );
      }

      return articulosFiltrados.sort();
    } else {
      return articulos;
    }
  }
}
