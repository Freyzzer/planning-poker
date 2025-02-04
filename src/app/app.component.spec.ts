import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let mockStore: any;
  beforeEach(async () => {

    mockStore = {
      pipe: jasmine.createSpy('pipe').and.returnValue(of([])), // Simula un observable vacío
      dispatch: jasmine.createSpy('dispatch'), // Simula el método dispatch
    };
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
              { provide: Store, useValue: mockStore },
            ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'plannig-poker' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('plannig-poker');
  });

});
