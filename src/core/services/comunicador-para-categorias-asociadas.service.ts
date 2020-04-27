import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CatGrmDiccionario } from '../models/cat-grm-diccionario';

@Injectable({
  providedIn: 'root'
})
export class ComunicadorParaCategoriasAsociadasService {
  // Observable string sources
  private emitChangeSource = new Subject<any[]>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any[]) {
    this.emitChangeSource.next(change);
  }
}
