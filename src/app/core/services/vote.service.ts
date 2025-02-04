import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private readonly player: PlayerService) { }

  // Obtener cartas votadas
  getCardsWithVotes(): Observable<{ card: string; votes: number }[]> {
    return this.player.getPlayersByView('player').pipe(
      map((players) => {
        const cardVotes: { [key: string]: number } = {};

        if (!players || players.length === 0) {
          return [];
        }

        players.forEach((player) => {
          if (player.card && !isNaN(Number(player.card))) {
            cardVotes[player.card] = (cardVotes[player.card] || 0) + 1;
          }
        });

        return Object.entries(cardVotes).map(([card, votes]) => ({ card, votes }));
      })
    );
  }

 // Calcular el promedio de votos
  getAverageVote(): Observable<number> {
    return this.player.getPlayersByView('player').pipe(
      map((players) => {
        if (!players || players.length === 0) {
          return 0;
        }

        let totalCards = 0;
        let count = 0;

        players.forEach((player) => {
          if (player.card && !isNaN(Number(player.card))) {
            totalCards += Number(player.card);
            count++;
          }
        });

        const average = totalCards / count;
        return parseFloat(average.toFixed(1));
      })
    );
  }
}


