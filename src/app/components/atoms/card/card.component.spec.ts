import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      pipe: jasmine.createSpy('pipe').and.returnValue(of([])), // Simula un observable vacío
      dispatch: jasmine.createSpy('dispatch'), // Simula el método dispatch
    };

    await TestBed.configureTestingModule({
      imports: [CardComponent], providers: [
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

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
