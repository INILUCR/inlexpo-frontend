import { SubGramatical } from './sub-gramatical';

export class CatGramatical {
  id: bigint;
  nombre: string;
  descripcion: string;
  abreviatura: string;
  subGramaticales: SubGramatical[];
}
