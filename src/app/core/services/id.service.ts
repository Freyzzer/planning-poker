import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IdService {
  private readonly idSubject = new BehaviorSubject<string>(''); // Inicializa con un valor vacío
  id$ = this.idSubject.asObservable(); // Expone el observable para que otros componentes se suscriban
  constructor() { }

  // Método para actualizar el ID
  setId(id: string): void {
    this.idSubject.next(id);
  }

  // Método para obtener el ID actual
  getId(): string {
    return this.idSubject.getValue();
  }

}
