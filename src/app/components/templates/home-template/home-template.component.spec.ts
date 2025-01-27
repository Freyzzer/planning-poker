import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeTemplateComponent } from './home-template.component';
import { BodyGameComponent } from '../../organisms/body-game/body-game.component';
import { FormUsuarioComponent } from '../../organisms/form-usuario/form-usuario.component';
import { NavbarComponent } from '../../organisms/navbar/navbar.component';
import { provideMockStore } from '@ngrx/store/testing'; // Importa herramientas de prueba para el store
import { ActivatedRoute } from '@angular/router';

describe('HomeTemplateComponent', () => {
  let component: HomeTemplateComponent;
  let fixture: ComponentFixture<HomeTemplateComponent>;

  // Estado inicial simulado para el store
  const initialState = {
    game: {
      players: [],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HomeTemplateComponent,
        NavbarComponent,
        BodyGameComponent,
        FormUsuarioComponent,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? 'test-game-id' : null), // Mock del parámetro 'id'
              },
            },
          },
        }, // Proporciona un mock del store
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update form values using registerPlayer', () => {
    const mockEvent = { name: 'John12', views: 'player' };
    component.registerPlayer(mockEvent);

    expect(component.formUsuario.value).toEqual({
      name: 'John12',
      views: 'player',
    });
  });
});
