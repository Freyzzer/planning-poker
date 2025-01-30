import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPlayerComponent } from './card-player.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { selectIsVotingRevealed, selectPlayers } from '../../../storage/selectors/game.selectors';

describe('CardPlayerComponent', () => {
  let component: CardPlayerComponent;
  let fixture: ComponentFixture<CardPlayerComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      pipe: jasmine.createSpy('pipe').and.callFake((selectorFn: any) => {
        if (selectorFn === selectPlayers) {
          return of([{ name: 'TestPlayer', card: true }]); // ✅ Asegura que el array tiene el jugador correcto
        }
        if (selectorFn === selectIsVotingRevealed) {
          return of(false);
        }
        return of([]);
      }),
    };

    await TestBed.configureTestingModule({
      imports: [CardPlayerComponent], // Componente standalone
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPlayerComponent);
    component = fixture.componentInstance;
    component.namePlayer = 'TestPlayer'; // Mock de las entradas
    component.viewPlayer = 'player'; // Mock de las entradas
    fixture.detectChanges();

  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct style for a spectator', () => {
    component.viewPlayer = 'spectator';
    const style = component.getStyle(true, false);
    expect(style).toContain('bg-[#BDBDFF]');
  });

  it('should return empty string for undefined viewPlayer', () => {
    component.viewPlayer = '';
    const style = component.getStyle(false, false);
    expect(style).toBe('');
  });

  it('should slice the first two letters of namePlayer for spectators', () => {
    component.viewPlayer = 'spectator';
    component.namePlayer = 'TestPlayer';
    component.getStyle(false, false);
    expect(component.info).toBe('TE');
  });

  it('should emit clickEvent when onClick is called', () => {
    spyOn(component.clickEvent, 'emit');
    component.onClick();
    expect(component.clickEvent.emit).toHaveBeenCalled();
  });
});
