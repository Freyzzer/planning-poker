import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BodyGameComponent } from './body-game.component';
import { TableComponent } from '../table/table.component';
import { CardComponent } from '../../atoms/card/card.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


describe('BodyGameComponent', () => {
  let component: BodyGameComponent;
  let fixture: ComponentFixture<BodyGameComponent>;

  let mockStore: any;

  beforeEach(async () => {
    // Mock del Store de NgRx
    mockStore = {
      select: jasmine.createSpy('select').and.returnValue(of([])), // Simula `select` devolviendo un observable vacío
      dispatch: jasmine.createSpy('dispatch'), // Simula `dispatch`
      pipe: jasmine.createSpy('pipe').and.returnValue(of([])),
    };
    await TestBed.configureTestingModule({
      imports: [
        BodyGameComponent, // Componente bajo prueba
        TableComponent, // Importa los componentes standalone requeridos
        CardComponent,
      ],
      providers: [
        {
          provide: Store,
          useValue: mockStore, // Proporciona el mock del Store
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? 'test-game-id' : null), // Mock del parámetro 'id'
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BodyGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render TableComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-table')).toBeTruthy();
  });

  
});
