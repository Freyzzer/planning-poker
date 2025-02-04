import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      select: jasmine.createSpy('select').and.returnValue(of([])), // Simula `select` devolviendo un observable vacío
      dispatch: jasmine.createSpy('dispatch'), // Simula `dispatch`
      pipe: jasmine.createSpy('pipe').and.returnValue(of([])),
    };
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: Store, useValue: mockStore },
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
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
