import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Diccionario } from '../models/diccionario';

@Injectable({
  providedIn: 'root'
})
export class ComunicadorParaDiccionarioCreadoService {
  // Observable string sources
  private emitChangeSource = new Subject<Diccionario>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: Diccionario) {
    this.emitChangeSource.next(change);
  }
}
