import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPlayerComponent } from './card-player.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('CardPlayerComponent', () => {
  let component: CardPlayerComponent;
  let fixture: ComponentFixture<CardPlayerComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      pipe: jasmine.createSpy('pipe').and.returnValue(
        of({ id: 'test-id', card: true }) // Simulación de datos del jugador
      ),
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

  it('should initialize player$ observable correctly', () => {
    component.player$.subscribe((player) => {
      expect(player).toEqual({ id: 'test-id', card: true });
    });
  });

  it('should update hasCard based on player card status', () => {
    // Trigger ngOnInit manually
    component.ngOnInit();
    expect(component.hasCard).toBeTrue(); // Basado en el mock
  });

  describe('getStyle method', () => {
    it('should return correct style for a player without a card', () => {
      component.hasCard = false;
      component.viewPlayer = 'player';
      const style = component.getStyle();
      expect(style).toContain('bg-transparent');
    });

    it('should return correct style for a player with a card', () => {
      component.hasCard = true;
      component.viewPlayer = 'player';
      const style = component.getStyle();
      expect(style).toContain('bg-[#BB65FF]');
    });

    it('should return correct style for a spectator', () => {
      component.viewPlayer = 'spectator';
      const style = component.getStyle();
      expect(style).toContain('bg-[#BDBDFF]');
    });

    it('should return empty string for undefined viewPlayer', () => {
      component.viewPlayer = '';
      const style = component.getStyle();
      expect(style).toBe('');
    });
  });

  it('should slice the first two letters of namePlayer for spectators', () => {
    component.viewPlayer = 'spectator';
    component.namePlayer = 'TestPlayer';
    component.getStyle();
    expect(component.letters).toBe('Te');
  });
});
