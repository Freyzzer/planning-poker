import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { selectScoringType, selectPlayers } from '../../../../storage/selectors/game.selectors';

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


  it('should update scoreOptions based on scoring type', () => {
    component.updateScoreOptions('PowersOfTwo');
    expect(component.scoreOptions).toEqual(['1', '2', '4', '8', '16', '32', '64', '128', '256', '512', '?', '☕']);
    
    component.updateScoreOptions('Fibonacci');
    expect(component.scoreOptions).toEqual(['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕']);
  });


});
