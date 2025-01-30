import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { selectScoringType, selectPlayers } from '../../../storage/selectors/game.selectors';
import { selectCard } from '../../../storage/action/game.actions';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      pipe: jasmine.createSpy('pipe').and.callFake(selector => {
        if (selector === selectPlayers) {
          return of([
            { id: 'player1', card: '5' },
            { id: 'player2', card: '8' },
            { id: 'player3', card: '?' } // Un caso especial
          ]);
        }
        if (selector === selectScoringType) {
          return of('Fibonacci');
        }
        return of([]);
      }),
      dispatch: jasmine.createSpy('dispatch')
    };

    await TestBed.configureTestingModule({
      imports: [CardComponent], 
      providers: [
        { provide: Store, useValue: mockStore },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? 'test-game-id' : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch selectCard when onSelectCard is called', () => {
    spyOn(localStorage, 'getItem').and.returnValue('player1');
    component.onSelectCard('5');
    expect(mockStore.dispatch).toHaveBeenCalledWith(selectCard({ playerId: 'player1', card: '5' }));
  });

  it('should update scoreOptions based on scoring type', () => {
    component.updateScoreOptions('PowersOfTwo');
    expect(component.scoreOptions).toEqual(['1', '2', '4', '8', '16', '32', '64', '128', '256', '512', '?', '☕']);
    
    component.updateScoreOptions('Fibonacci');
    expect(component.scoreOptions).toEqual(['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕']);
  });

  it('should calculate averageVote$ correctly', (done) => {
    const mockPlayers = [
      { id: '1', card: '5' },  // Carta válida
      { id: '2', card: '8' },  // Carta válida
      { id: '3', card: '?' },  // Carta no válida (se debería ignorar)
    ];
  
    // Simula la emisión de los jugadores con las cartas
    mockStore.pipe.and.returnValue(of(mockPlayers));
  
    // Dispara el cálculo del promedio
    component.averageVote$.subscribe(avg => {
      expect(avg).toBe(6.5); // (5 + 8) / 2 = 6.5
      done();
    });
  
    fixture.detectChanges();  // Asegúrate de que Angular actualice el componente
  });
});
