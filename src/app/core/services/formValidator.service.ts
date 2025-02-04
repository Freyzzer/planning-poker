import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

   /** Mensajes de error centralizados */
   private readonly errorMessages = {
    required: 'El nombre de la partida es requerido.',
    minLength: 'El nombre debe tener entre 5 y 20 caracteres.',
    maxLength: 'El nombre no puede exceder los 20 caracteres.',
    specialChars: 'El nombre solo puede contener letras, números y espacios.',
    maxNumbers: 'El nombre no puede contener más de 3 números.',
    onlyNumbers: 'El nombre no puede contener solo números.',
  };

  /** Validación general */
  validateForm(name: string): string | null {
    name = name.trim();

    if (!name) return this.errorMessages.required;
    if (name.length < 5 || name.length > 20) return this.errorMessages.minLength;
    if (!/^[a-zA-Z0-9\s]+$/.test(name)) return this.errorMessages.specialChars;
    if ((name.match(/\d/g) || []).length > 3) return this.errorMessages.maxNumbers;
    if (/^\d+$/.test(name)) return this.errorMessages.onlyNumbers;

    return null; // ✅ No hay errores
  }
}