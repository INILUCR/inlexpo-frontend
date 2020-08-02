import { CatGramatical } from './cat-gramatical';
import { SubGramatical } from './sub-gramatical';

export class Acepcion {
  id: number;
  definicion: string;
  prioridad: number;
  catGramatical: CatGramatical;
  subGramatical: SubGramatical;
}
