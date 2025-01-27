import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _game: any[] = [];
  private _users: any[] = [];
  private _cards: any[] = [];
  constructor() { 
    
  }

  //Metods for Game
  public get game(): any[] {
    return this._game;
  }
  public set game(value: any[]) {
    this._game = value;
  }
  public addGame(partida: any): void {
    this._game.push(partida);
  }

  public getGameById(id: string): any {
    return this._game.find((g) => g.id === id);
  }

  //Methods for Users
  public get users(): any[] {
    return this._users;
  }
  public set users(value: any[]) {
    this._users = value;
  } 
  public addUser(usuario: any): void {
    this._users.push(usuario);
  }
  public getUserById(id: string): any {
    return this._users.find((u) => u.id === id);
  }

  //Methods for Cards
  public get cards(): any[] {
    return this._cards;
  }
  public set cards(value: any[]) {
    this._cards = value;
  }
  public addCard(card: number): void {
    if (!this._cards.includes(card)) {
      this._cards.push(card);
    }
  }
  public clearCards(): void {
    this._cards = [];
  }
  

}
