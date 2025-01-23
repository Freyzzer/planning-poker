import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyGameComponent } from './body-game.component';

describe('BodyGameComponent', () => {
  let component: BodyGameComponent;
  let fixture: ComponentFixture<BodyGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
