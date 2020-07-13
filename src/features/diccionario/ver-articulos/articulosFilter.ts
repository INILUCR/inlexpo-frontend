import { Pipe, PipeTransform } from '@angular/core';
import { Articulo } from 'src/core/models/articulo';

@Pipe({ name: 'articulosPipe' })
export class ArticulosFilterPipe implements PipeTransform {
  transform(articulos: Articulo[], searchText: string): Articulo[] {
    if (!articulos) {
      return [];
    }
    if (!searchText) {
      return articulos;
    }
    searchText = searchText.toLocaleLowerCase();

    return articulos.filter(articulo => {
      return articulo.lema.toLocaleLowerCase().includes(searchText);
    });
  }
}